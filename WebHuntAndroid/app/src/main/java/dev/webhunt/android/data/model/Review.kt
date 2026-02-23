package dev.webhunt.android.data.model

import com.google.gson.annotations.SerializedName

data class Review(
    val id: Int,
    @SerializedName("reviewer_id") val reviewerId: Int,
    @SerializedName("product_id") val productId: Int,
    val body: String,
    @SerializedName("parent_review_id") val parentReviewId: Int? = null,
    @SerializedName("created_at") val createdAt: String,
    @SerializedName("updated_at") val updatedAt: String
)
