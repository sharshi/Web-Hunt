package dev.webhunt.android.data.model

import com.google.gson.annotations.SerializedName

data class Upvote(
    val id: Int,
    @SerializedName("user_id") val userId: Int
)
