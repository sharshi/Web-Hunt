package dev.webhunt.android.data.model

data class SessionResponse(
    val id: Int,
    val username: String,
    val email: String,
    val name: String? = null,
    val profilePictureUrl: String? = null,
    val profileHeaderUrl: String? = null
)
