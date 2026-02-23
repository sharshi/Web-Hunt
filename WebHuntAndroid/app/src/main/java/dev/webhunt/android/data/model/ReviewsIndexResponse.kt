package dev.webhunt.android.data.model

import com.google.gson.JsonDeserializationContext
import com.google.gson.JsonDeserializer
import com.google.gson.JsonElement
import java.lang.reflect.Type

data class ReviewsIndexResponse(
    val reviews: Map<Int, Review>
)

class ReviewsIndexResponseDeserializer : JsonDeserializer<ReviewsIndexResponse> {
    override fun deserialize(
        json: JsonElement,
        typeOfT: Type,
        context: JsonDeserializationContext
    ): ReviewsIndexResponse {
        val jsonObject = json.asJsonObject
        val reviews = mutableMapOf<Int, Review>()

        for ((key, value) in jsonObject.entrySet()) {
            val intKey = key.toIntOrNull()
            if (intKey != null) {
                val review = context.deserialize<Review>(value, Review::class.java)
                reviews[intKey] = review
            }
        }

        return ReviewsIndexResponse(reviews)
    }
}
