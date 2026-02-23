package dev.webhunt.android.data.network

import dev.webhunt.android.data.model.Product
import dev.webhunt.android.data.model.ProductsIndexResponse
import dev.webhunt.android.data.model.Review
import dev.webhunt.android.data.model.ReviewsIndexResponse
import dev.webhunt.android.data.model.SessionResponse
import dev.webhunt.android.data.model.User
import okhttp3.MultipartBody
import okhttp3.RequestBody
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.Multipart
import retrofit2.http.POST
import retrofit2.http.Part
import retrofit2.http.Path

interface ApiService {

    // Auth
    @POST("api/session")
    suspend fun login(@Body body: Map<String, @JvmSuppressWildcards Map<String, String>>): Response<SessionResponse>

    @POST("api/users")
    suspend fun signup(@Body body: Map<String, @JvmSuppressWildcards Map<String, String>>): Response<SessionResponse>

    @DELETE("api/session")
    suspend fun logout(): Response<List<String>>

    // Products
    @GET("api/products")
    suspend fun fetchProducts(): Response<ProductsIndexResponse>

    @GET("api/products/{id}")
    suspend fun fetchProduct(@Path("id") id: Int): Response<Product>

    @Multipart
    @POST("api/products")
    suspend fun createProduct(
        @Part("product[title]") title: RequestBody,
        @Part("product[tagline]") tagline: RequestBody,
        @Part("product[website]") website: RequestBody,
        @Part("product[description]") description: RequestBody,
        @Part("product[hunter_id]") hunterId: RequestBody,
        @Part("product[launch_date]") launchDate: RequestBody,
        @Part("product[status]") status: RequestBody,
        @Part logo: MultipartBody.Part?
    ): Response<Product>

    // Users
    @GET("api/users/{id}")
    suspend fun fetchUser(@Path("id") id: Int): Response<User>

    @GET("api/username/{username}")
    suspend fun fetchUserByUsername(@Path("username") username: String): Response<User>

    // Reviews
    @GET("api/products/{productId}/reviews")
    suspend fun fetchReviews(@Path("productId") productId: Int): Response<ReviewsIndexResponse>

    @POST("api/reviews")
    suspend fun createReview(@Body body: Map<String, Map<String, @JvmSuppressWildcards Any>>): Response<Review>

    // Upvotes
    @POST("api/upvotes")
    suspend fun toggleUpvote(@Body body: Map<String, Map<String, @JvmSuppressWildcards Any>>): Response<Boolean>
}
