package dev.webhunt.android.data.model

import com.google.gson.annotations.SerializedName

data class Product(
    val id: Int,
    val title: String,
    val tagline: String,
    val website: String,
    val description: String? = null,
    val logoUrl: String? = null,
    @SerializedName("launch_date") val launchDate: String? = null,
    val thumbnail: String? = null,
    val status: Boolean? = null,
    val youtube: String? = null,
    val twitter: String? = null,
    @SerializedName("hunter_id") val hunterId: Int = 0,
    @SerializedName("review_ids") val reviewIds: List<Int>? = null,
    @SerializedName("topic_ids") val topicIds: List<Int>? = null,
    val topics: List<Topic>? = null,
    @SerializedName("upvote_ids") var upvoteIds: List<Int>? = null,
    val screenshotUrls: List<String>? = null,
    val hunter: User? = null,
    val upvoters: Map<String, User>? = null
)
