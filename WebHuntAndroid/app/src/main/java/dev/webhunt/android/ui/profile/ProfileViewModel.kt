package dev.webhunt.android.ui.profile

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import dev.webhunt.android.data.model.Product
import dev.webhunt.android.data.model.User
import dev.webhunt.android.data.network.ApiClient
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class ProfileViewModel @Inject constructor(
    private val apiClient: ApiClient
) : ViewModel() {

    var profileUser by mutableStateOf<User?>(null)
        private set
    var isLoading by mutableStateOf(false)
        private set
    var errorMessage by mutableStateOf<String?>(null)
        private set

    val userProducts: List<Product>
        get() {
            val products = profileUser?.products ?: return emptyList()
            return products.values.sortedByDescending { it.id }
        }

    val upvotedProducts: List<Product>
        get() {
            val products = profileUser?.upvotedProducts ?: return emptyList()
            return products.values.sortedByDescending { it.id }
        }

    fun fetchProfile(username: String) {
        viewModelScope.launch {
            isLoading = true
            errorMessage = null
            try {
                profileUser = apiClient.fetchUserByUsername(username)
            } catch (e: Exception) {
                errorMessage = e.message ?: "Failed to load profile"
            }
            isLoading = false
        }
    }

    fun fetchProfile(userId: Int) {
        viewModelScope.launch {
            isLoading = true
            errorMessage = null
            try {
                profileUser = apiClient.fetchUser(userId)
            } catch (e: Exception) {
                errorMessage = e.message ?: "Failed to load profile"
            }
            isLoading = false
        }
    }

    fun resolveUrl(path: String?): String? = apiClient.resolveUrl(path)
}
