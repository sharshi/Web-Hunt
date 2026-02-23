package dev.webhunt.android.ui.product

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.PersonOutline
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import dev.webhunt.android.ui.auth.AuthViewModel
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale
import java.util.concurrent.TimeUnit

@Composable
fun ReviewsSection(
    productId: Int,
    productsViewModel: ProductsViewModel,
    authViewModel: AuthViewModel,
    modifier: Modifier = Modifier
) {
    var newReviewBody by remember { mutableStateOf("") }
    var isSubmitting by remember { mutableStateOf(false) }

    LaunchedEffect(productId) {
        productsViewModel.fetchReviews(productId)
    }

    Column(modifier = modifier.fillMaxWidth()) {
        // Header
        Row(verticalAlignment = Alignment.CenterVertically) {
            Text("Discussion", style = MaterialTheme.typography.titleMedium)
            Spacer(modifier = Modifier.weight(1f))
            Text(
                text = "${productsViewModel.reviews.size}",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                modifier = Modifier
                    .background(
                        MaterialTheme.colorScheme.surfaceVariant,
                        CircleShape
                    )
                    .padding(horizontal = 8.dp, vertical = 2.dp)
            )
        }

        Spacer(modifier = Modifier.height(16.dp))

        // New review input
        if (authViewModel.isAuthenticated) {
            Row(modifier = Modifier.fillMaxWidth()) {
                Icon(
                    imageVector = Icons.Default.Person,
                    contentDescription = null,
                    modifier = Modifier
                        .size(32.dp)
                        .padding(top = 8.dp),
                    tint = MaterialTheme.colorScheme.primary
                )
                Spacer(modifier = Modifier.width(12.dp))
                Column(modifier = Modifier.weight(1f)) {
                    OutlinedTextField(
                        value = newReviewBody,
                        onValueChange = { newReviewBody = it },
                        placeholder = { Text("Share your thoughts...") },
                        modifier = Modifier.fillMaxWidth(),
                        maxLines = 5
                    )
                    if (newReviewBody.isNotBlank()) {
                        Spacer(modifier = Modifier.height(8.dp))
                        Row(modifier = Modifier.fillMaxWidth()) {
                            Spacer(modifier = Modifier.weight(1f))
                            Button(
                                onClick = {
                                    val userId = authViewModel.currentUser?.id ?: return@Button
                                    val body = newReviewBody.trim()
                                    if (body.isEmpty()) return@Button
                                    isSubmitting = true
                                    productsViewModel.submitReview(productId, userId, body) {
                                        newReviewBody = ""
                                        isSubmitting = false
                                    }
                                },
                                enabled = !isSubmitting && newReviewBody.isNotBlank(),
                                colors = ButtonDefaults.buttonColors(
                                    containerColor = MaterialTheme.colorScheme.primary
                                )
                            ) {
                                if (isSubmitting) {
                                    CircularProgressIndicator(
                                        modifier = Modifier.size(16.dp),
                                        strokeWidth = 2.dp
                                    )
                                } else {
                                    Text("Comment", style = MaterialTheme.typography.bodySmall)
                                }
                            }
                        }
                    }
                }
            }
        } else {
            Text(
                text = "Sign in to join the discussion",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                textAlign = TextAlign.Center,
                modifier = Modifier
                    .fillMaxWidth()
                    .background(
                        MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.3f),
                        RoundedCornerShape(8.dp)
                    )
                    .padding(vertical = 12.dp)
            )
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Reviews list
        when {
            productsViewModel.isLoadingReviews -> {
                CircularProgressIndicator(
                    modifier = Modifier
                        .align(Alignment.CenterHorizontally)
                        .padding(16.dp)
                )
            }
            productsViewModel.reviews.isEmpty() -> {
                Text(
                    text = "No comments yet. Be the first!",
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                    textAlign = TextAlign.Center,
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 24.dp)
                )
            }
            else -> {
                productsViewModel.reviews.forEach { review ->
                    ReviewRow(
                        reviewerId = review.reviewerId,
                        body = review.body,
                        createdAt = review.createdAt
                    )
                }
            }
        }
    }
}

@Composable
private fun ReviewRow(
    reviewerId: Int,
    body: String,
    createdAt: String
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 8.dp)
    ) {
        Icon(
            imageVector = Icons.Default.PersonOutline,
            contentDescription = null,
            modifier = Modifier.size(28.dp),
            tint = MaterialTheme.colorScheme.onSurfaceVariant
        )
        Spacer(modifier = Modifier.width(12.dp))
        Column(modifier = Modifier.weight(1f)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Text(
                    "User #$reviewerId",
                    style = MaterialTheme.typography.bodyMedium,
                    fontWeight = FontWeight.SemiBold
                )
                Spacer(modifier = Modifier.weight(1f))
                Text(
                    text = formatRelativeDate(createdAt),
                    style = MaterialTheme.typography.labelSmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
            Spacer(modifier = Modifier.height(4.dp))
            Text(
                text = body,
                style = MaterialTheme.typography.bodyLarge
            )
        }
    }
}

private fun formatRelativeDate(dateString: String): String {
    val formats = listOf(
        SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.US),
        SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'", Locale.US),
        SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ", Locale.US)
    )
    for (format in formats) {
        try {
            val date = format.parse(dateString) ?: continue
            val now = Date()
            val diffMs = now.time - date.time
            val diffMin = TimeUnit.MILLISECONDS.toMinutes(diffMs)
            val diffHr = TimeUnit.MILLISECONDS.toHours(diffMs)
            val diffDays = TimeUnit.MILLISECONDS.toDays(diffMs)
            return when {
                diffMin < 1 -> "just now"
                diffMin < 60 -> "${diffMin}m ago"
                diffHr < 24 -> "${diffHr}h ago"
                diffDays < 30 -> "${diffDays}d ago"
                diffDays < 365 -> "${diffDays / 30}mo ago"
                else -> "${diffDays / 365}y ago"
            }
        } catch (_: Exception) {
            continue
        }
    }
    return dateString
}
