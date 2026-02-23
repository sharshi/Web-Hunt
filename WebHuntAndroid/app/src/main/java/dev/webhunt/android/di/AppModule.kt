package dev.webhunt.android.di

import com.google.gson.GsonBuilder
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import dev.webhunt.android.BuildConfig
import dev.webhunt.android.data.model.ProductsIndexResponse
import dev.webhunt.android.data.model.ProductsIndexResponseDeserializer
import dev.webhunt.android.data.model.ReviewsIndexResponse
import dev.webhunt.android.data.model.ReviewsIndexResponseDeserializer
import dev.webhunt.android.data.model.User
import dev.webhunt.android.data.model.UserDeserializer
import dev.webhunt.android.data.network.ApiClient
import dev.webhunt.android.data.network.ApiService
import dev.webhunt.android.data.network.CookieJarImpl
import dev.webhunt.android.data.network.CsrfInterceptor
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object AppModule {

    @Provides
    @Singleton
    fun provideCookieJar(): CookieJarImpl = CookieJarImpl()

    @Provides
    @Singleton
    fun provideCsrfInterceptor(cookieJar: CookieJarImpl): CsrfInterceptor {
        return CsrfInterceptor(BuildConfig.BASE_URL, cookieJar)
    }

    @Provides
    @Singleton
    fun provideOkHttpClient(
        cookieJar: CookieJarImpl,
        csrfInterceptor: CsrfInterceptor
    ): OkHttpClient {
        val logging = HttpLoggingInterceptor().apply {
            level = HttpLoggingInterceptor.Level.BODY
        }
        return OkHttpClient.Builder()
            .cookieJar(cookieJar)
            .addInterceptor(csrfInterceptor)
            .addInterceptor(logging)
            .build()
    }

    @Provides
    @Singleton
    fun provideRetrofit(okHttpClient: OkHttpClient): Retrofit {
        val gson = GsonBuilder()
            .registerTypeAdapter(ProductsIndexResponse::class.java, ProductsIndexResponseDeserializer())
            .registerTypeAdapter(ReviewsIndexResponse::class.java, ReviewsIndexResponseDeserializer())
            .registerTypeAdapter(User::class.java, UserDeserializer())
            .create()

        return Retrofit.Builder()
            .baseUrl(BuildConfig.BASE_URL + "/")
            .client(okHttpClient)
            .addConverterFactory(GsonConverterFactory.create(gson))
            .build()
    }

    @Provides
    @Singleton
    fun provideApiService(retrofit: Retrofit): ApiService {
        return retrofit.create(ApiService::class.java)
    }

    @Provides
    @Singleton
    fun provideApiClient(
        apiService: ApiService,
        csrfInterceptor: CsrfInterceptor,
        cookieJar: CookieJarImpl
    ): ApiClient {
        return ApiClient(apiService, csrfInterceptor, cookieJar)
    }
}
