package dev.webhunt.android.data.model

import com.google.gson.JsonDeserializationContext
import com.google.gson.JsonDeserializer
import com.google.gson.JsonElement
import com.google.gson.annotations.SerializedName
import java.lang.reflect.Type

data class User(
    val id: Int,
    val username: String,
    val email: String,
    val name: String? = null,
    val profilePictureUrl: String? = null,
    val profileHeaderUrl: String? = null,
    @SerializedName("product_ids") val productIds: List<Int>? = null,
    @SerializedName("review_ids") val reviewIds: List<Int>? = null,
    @SerializedName("upvote_ids") val upvoteIds: List<Int>? = null,
    @SerializedName("upvoted_product_ids") val upvotedProductIds: List<Int>? = null,
    val products: Map<String, Product>? = null,
    @SerializedName("upvoted_products") val upvotedProducts: Map<String, Product>? = null
)

class UserDeserializer : JsonDeserializer<User> {
    override fun deserialize(
        json: JsonElement,
        typeOfT: Type,
        context: JsonDeserializationContext
    ): User {
        val obj = json.asJsonObject

        fun parseProductMap(key: String): Map<String, Product>? {
            val element = obj.get(key) ?: return null
            val map = mutableMapOf<String, Product>()
            when {
                // Array of objects with dynamic keys: [{"1": {...}}, {"2": {...}}]
                element.isJsonArray -> {
                    for (item in element.asJsonArray) {
                        if (item.isJsonObject) {
                            for ((k, v) in item.asJsonObject.entrySet()) {
                                map[k] = context.deserialize(v, Product::class.java)
                            }
                        }
                    }
                }
                // Flat object with dynamic keys: {"1": {...}, "2": {...}}
                element.isJsonObject -> {
                    for ((k, v) in element.asJsonObject.entrySet()) {
                        map[k] = context.deserialize(v, Product::class.java)
                    }
                }
            }
            return map.ifEmpty { null }
        }

        fun parseIntList(key: String): List<Int>? {
            val element = obj.get(key) ?: return null
            if (!element.isJsonArray) return null
            return element.asJsonArray.map { it.asInt }
        }

        return User(
            id = obj.get("id").asInt,
            username = obj.get("username").asString,
            email = obj.get("email").asString,
            name = obj.get("name")?.takeIf { !it.isJsonNull }?.asString,
            profilePictureUrl = obj.get("profilePictureUrl")?.takeIf { !it.isJsonNull }?.asString,
            profileHeaderUrl = obj.get("profileHeaderUrl")?.takeIf { !it.isJsonNull }?.asString,
            productIds = parseIntList("product_ids"),
            reviewIds = parseIntList("review_ids"),
            upvoteIds = parseIntList("upvote_ids"),
            upvotedProductIds = parseIntList("upvoted_product_ids"),
            products = parseProductMap("products"),
            upvotedProducts = parseProductMap("upvoted_products")
        )
    }
}
