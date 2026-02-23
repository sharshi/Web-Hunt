package dev.webhunt.android.data.network

import okhttp3.Cookie
import okhttp3.CookieJar
import okhttp3.HttpUrl

class CookieJarImpl : CookieJar {
    private val cookieStore = mutableMapOf<String, MutableList<Cookie>>()

    override fun saveFromResponse(url: HttpUrl, cookies: List<Cookie>) {
        cookieStore.getOrPut(url.host) { mutableListOf() }.apply {
            // Remove existing cookies with same name before adding new ones
            cookies.forEach { newCookie ->
                removeAll { it.name == newCookie.name }
            }
            addAll(cookies)
        }
    }

    override fun loadForRequest(url: HttpUrl): List<Cookie> {
        return cookieStore[url.host]?.filter { !it.expiresAt.let { exp -> exp < System.currentTimeMillis() } } ?: emptyList()
    }

    fun clear() {
        cookieStore.clear()
    }
}
