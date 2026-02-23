package dev.webhunt.android.data.network

import okhttp3.Interceptor
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.Response

class CsrfInterceptor(
    private val baseUrl: String,
    private val cookieJar: CookieJarImpl
) : Interceptor {

    @Volatile
    private var csrfToken: String? = null

    override fun intercept(chain: Interceptor.Chain): Response {
        val request = chain.request()
        val method = request.method.uppercase()

        // Only add CSRF token for mutation requests
        if (method in listOf("POST", "PUT", "PATCH", "DELETE")) {
            ensureCsrfToken()
            val newRequest = csrfToken?.let { token ->
                request.newBuilder()
                    .header("X-CSRF-Token", token)
                    .build()
            } ?: request
            return chain.proceed(newRequest)
        }

        return chain.proceed(request)
    }

    private fun ensureCsrfToken() {
        if (csrfToken != null) return

        // Use a separate OkHttpClient to avoid interceptor chain recursion
        val plainClient = OkHttpClient.Builder()
            .cookieJar(cookieJar)
            .build()

        val request = Request.Builder()
            .url("$baseUrl/")
            .header("Accept", "text/html")
            .get()
            .build()

        try {
            val response = plainClient.newCall(request).execute()
            val html = response.body?.string() ?: return
            // Parse: <meta name="csrf-token" content="TOKEN_HERE" />
            val marker = "csrf-token\" content=\""
            val startIndex = html.indexOf(marker)
            if (startIndex != -1) {
                val tokenStart = startIndex + marker.length
                val tokenEnd = html.indexOf("\"", tokenStart)
                if (tokenEnd != -1) {
                    csrfToken = html.substring(tokenStart, tokenEnd)
                }
            }
        } catch (_: Exception) {
            // CSRF fetch failed; requests may fail with 422
        }
    }

    fun clearToken() {
        csrfToken = null
    }
}
