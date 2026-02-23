package dev.webhunt.android.ui.product

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateMapOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import dev.webhunt.android.data.model.Product
import dev.webhunt.android.data.model.Review
import dev.webhunt.android.data.network.ApiClient
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class ProductsViewModel @Inject constructor(
    private val apiClient: ApiClient
) : ViewModel() {

    val products = mutableStateMapOf<Int, Product>()
    var popularIds by mutableStateOf<List<Int>>(emptyList())
        private set
    var recentIds by mutableStateOf<List<Int>>(emptyList())
        private set
    var isLoading by mutableStateOf(false)
        private set
    var errorMessage by mutableStateOf<String?>(null)
        private set
    var selectedProduct by mutableStateOf<Product?>(null)
        private set
    var reviews by mutableStateOf<List<Review>>(emptyList())
        private set
    var isLoadingReviews by mutableStateOf(false)
        private set
    var sortByPopular by mutableStateOf(true)

    val sortedProducts: List<Product>
        get() {
            val ids = if (sortByPopular) popularIds else recentIds
            return ids.mapNotNull { products[it] }
        }

    fun fetchProducts() {
        viewModelScope.launch {
            isLoading = true
            errorMessage = null
            try {
                val response = apiClient.fetchProducts()
                products.clear()
                products.putAll(response.products)
                popularIds = response.popularIds
                recentIds = response.recentIds
            } catch (e: Exception) {
                errorMessage = e.message ?: "Failed to load products"
            }
            isLoading = false
        }
    }

    fun fetchProductDetail(id: Int) {
        viewModelScope.launch {
            isLoading = true
            errorMessage = null
            try {
                val product = apiClient.fetchProduct(id)
                selectedProduct = product
                products[id] = product
            } catch (e: Exception) {
                errorMessage = e.message ?: "Failed to load product"
            }
            isLoading = false
        }
    }

    fun fetchReviews(productId: Int) {
        viewModelScope.launch {
            isLoadingReviews = true
            try {
                reviews = apiClient.fetchReviews(productId)
            } catch (_: Exception) {
                reviews = emptyList()
            }
            isLoadingReviews = false
        }
    }

    fun submitReview(productId: Int, reviewerId: Int, body: String, onSuccess: () -> Unit) {
        viewModelScope.launch {
            try {
                val review = apiClient.createReview(productId, reviewerId, body)
                reviews = reviews + review
                onSuccess()
            } catch (_: Exception) {
                // Review submission failed
            }
        }
    }

    fun toggleUpvote(productId: Int, userId: Int) {
        val product = products[productId] ?: return
        val upvoteIds = product.upvoteIds?.toMutableList() ?: mutableListOf()
        val wasUpvoted = upvoteIds.contains(userId)

        // Optimistic update
        if (wasUpvoted) {
            upvoteIds.remove(userId)
        } else {
            upvoteIds.add(userId)
        }
        val updated = product.copy(upvoteIds = upvoteIds.toList())
        products[productId] = updated
        if (selectedProduct?.id == productId) {
            selectedProduct = updated
        }

        viewModelScope.launch {
            try {
                apiClient.toggleUpvote("Product", productId, userId)
            } catch (_: Exception) {
                // Revert on failure
                val revertIds = if (wasUpvoted) {
                    upvoteIds.toMutableList().also { it.add(userId) }
                } else {
                    upvoteIds.toMutableList().also { it.remove(userId) }
                }
                val reverted = product.copy(upvoteIds = revertIds.toList())
                products[productId] = reverted
                if (selectedProduct?.id == productId) {
                    selectedProduct = reverted
                }
            }
        }
    }

    fun createProduct(
        title: String,
        tagline: String,
        website: String,
        description: String,
        hunterId: Int,
        logoBytes: ByteArray?,
        logoFilename: String?,
        onSuccess: () -> Unit
    ) {
        viewModelScope.launch {
            isLoading = true
            errorMessage = null
            try {
                val product = apiClient.createProduct(
                    title, tagline, website, description, hunterId, logoBytes, logoFilename
                )
                products[product.id] = product
                recentIds = listOf(product.id) + recentIds
                isLoading = false
                onSuccess()
            } catch (e: Exception) {
                errorMessage = e.message ?: "Failed to create product"
                isLoading = false
            }
        }
    }

    fun resolveUrl(path: String?): String? = apiClient.resolveUrl(path)
}
