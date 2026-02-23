package dev.webhunt.android.data.model

import com.google.gson.JsonDeserializationContext
import com.google.gson.JsonDeserializer
import com.google.gson.JsonElement
import java.lang.reflect.Type

data class ProductsIndexResponse(
    val products: Map<Int, Product>,
    val recentIds: List<Int>,
    val popularIds: List<Int>
)

class ProductsIndexResponseDeserializer : JsonDeserializer<ProductsIndexResponse> {
    override fun deserialize(
        json: JsonElement,
        typeOfT: Type,
        context: JsonDeserializationContext
    ): ProductsIndexResponse {
        val jsonObject = json.asJsonObject
        val products = mutableMapOf<Int, Product>()
        var recentIds = listOf<Int>()
        var popularIds = listOf<Int>()

        for ((key, value) in jsonObject.entrySet()) {
            when (key) {
                "recentIds" -> {
                    recentIds = value.asJsonArray.map { it.asInt }
                }
                "popularIds" -> {
                    popularIds = value.asJsonArray.map { it.asInt }
                }
                else -> {
                    val intKey = key.toIntOrNull()
                    if (intKey != null) {
                        val product = context.deserialize<Product>(value, Product::class.java)
                        products[intKey] = product
                    }
                }
            }
        }

        return ProductsIndexResponse(products, recentIds, popularIds)
    }
}
