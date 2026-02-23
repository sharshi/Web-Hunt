package dev.webhunt.android.data.network

import dev.webhunt.android.BuildConfig
import dev.webhunt.android.data.model.Product
import dev.webhunt.android.data.model.ProductsIndexResponse
import dev.webhunt.android.data.model.Review
import dev.webhunt.android.data.model.ReviewsIndexResponse
import dev.webhunt.android.data.model.SessionResponse
import dev.webhunt.android.data.model.User
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.MultipartBody
import okhttp3.RequestBody.Companion.toRequestBody
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

class ApiClient(
    private val apiService: ApiService,
    private val csrfInterceptor: CsrfInterceptor,
    private val cookieJar: CookieJarImpl
) {
    private val baseUrl: String get() = BuildConfig.BASE_URL

    // MARK: - Auth

    suspend fun login(username: String, password: String): SessionResponse {
        val body = mapOf("user" to mapOf("username" to username, "password" to password))
        val response = apiService.login(body)
        if (response.isSuccessful) {
            return response.body()!!
        }
        throw ApiException(parseError(response.errorBody()?.string()))
    }

    suspend fun signup(username: String, email: String, password: String): SessionResponse {
        val body = mapOf("user" to mapOf("username" to username, "email" to email, "password" to password))
        val response = apiService.signup(body)
        if (response.isSuccessful) {
            return response.body()!!
        }
        throw ApiException(parseError(response.errorBody()?.string()))
    }

    suspend fun logout() {
        apiService.logout()
        csrfInterceptor.clearToken()
    }

    // MARK: - Products

    suspend fun fetchProducts(): ProductsIndexResponse {
        val response = apiService.fetchProducts()
        if (response.isSuccessful) {
            return response.body()!!
        }
        throw ApiException(parseError(response.errorBody()?.string()))
    }

    suspend fun fetchProduct(id: Int): Product {
        val response = apiService.fetchProduct(id)
        if (response.isSuccessful) {
            return response.body()!!
        }
        throw ApiException(parseError(response.errorBody()?.string()))
    }

    suspend fun createProduct(
        title: String,
        tagline: String,
        website: String,
        description: String,
        hunterId: Int,
        logoBytes: ByteArray?,
        logoFilename: String?
    ): Product {
        val textType = "text/plain".toMediaType()
        val dateFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssZ", Locale.US)

        val logoPart = if (logoBytes != null && logoFilename != null) {
            val requestBody = logoBytes.toRequestBody("image/jpeg".toMediaType())
            MultipartBody.Part.createFormData("product[logo]", logoFilename, requestBody)
        } else null

        val response = apiService.createProduct(
            title = title.toRequestBody(textType),
            tagline = tagline.toRequestBody(textType),
            website = website.toRequestBody(textType),
            description = description.toRequestBody(textType),
            hunterId = hunterId.toString().toRequestBody(textType),
            launchDate = dateFormat.format(Date()).toRequestBody(textType),
            status = "true".toRequestBody(textType),
            logo = logoPart
        )

        if (response.isSuccessful) {
            return response.body()!!
        }
        throw ApiException(parseError(response.errorBody()?.string()))
    }

    // MARK: - Users

    suspend fun fetchUser(id: Int): User {
        val response = apiService.fetchUser(id)
        if (response.isSuccessful) {
            return response.body()!!
        }
        throw ApiException(parseError(response.errorBody()?.string()))
    }

    suspend fun fetchUserByUsername(username: String): User {
        val response = apiService.fetchUserByUsername(username)
        if (response.isSuccessful) {
            return response.body()!!
        }
        throw ApiException(parseError(response.errorBody()?.string()))
    }

    // MARK: - Reviews

    suspend fun fetchReviews(productId: Int): List<Review> {
        val response = apiService.fetchReviews(productId)
        if (response.isSuccessful) {
            return response.body()!!.reviews.values.sortedBy { it.id }
        }
        throw ApiException(parseError(response.errorBody()?.string()))
    }

    suspend fun createReview(
        productId: Int,
        reviewerId: Int,
        body: String,
        parentReviewId: Int? = null
    ): Review {
        val reviewBody = mutableMapOf<String, Any>(
            "reviewer_id" to reviewerId,
            "product_id" to productId,
            "body" to body
        )
        if (parentReviewId != null) {
            reviewBody["parent_review_id"] = parentReviewId
        }
        val requestBody = mapOf("review" to reviewBody)
        val response = apiService.createReview(requestBody)
        if (response.isSuccessful) {
            return response.body()!!
        }
        throw ApiException(parseError(response.errorBody()?.string()))
    }

    // MARK: - Upvotes

    suspend fun toggleUpvote(upvoteableType: String, upvoteableId: Int, userId: Int): Boolean {
        val body = mapOf(
            "vote" to mapOf<String, Any>(
                "upvoteable_type" to upvoteableType,
                "upvoteable_id" to upvoteableId,
                "user_id" to userId
            )
        )
        val response = apiService.toggleUpvote(body)
        if (response.isSuccessful) {
            return response.body() ?: true
        }
        throw ApiException(parseError(response.errorBody()?.string()))
    }

    // MARK: - Helpers

    fun resolveUrl(path: String?): String? {
        if (path == null) return null
        if (path.startsWith("http")) return path
        return "$baseUrl$path"
    }

    private fun parseError(errorBody: String?): String {
        if (errorBody == null) return "Unknown error"
        // Try to parse as JSON array of strings: ["error message"]
        return try {
            val trimmed = errorBody.trim()
            if (trimmed.startsWith("[")) {
                trimmed.removeSurrounding("[", "]")
                    .split(",")
                    .joinToString(", ") { it.trim().removeSurrounding("\"") }
            } else {
                trimmed
            }
        } catch (_: Exception) {
            errorBody
        }
    }
}

class ApiException(message: String) : Exception(message)
