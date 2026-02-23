package dev.webhunt.android.ui.profile

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Inventory2
import androidx.compose.material.icons.filled.ThumbUp
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Divider
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FilterChip
import androidx.compose.material3.FilterChipDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImage
import dev.webhunt.android.data.model.Product
import dev.webhunt.android.ui.auth.AuthViewModel
import dev.webhunt.android.ui.components.UpvoteButton
import dev.webhunt.android.ui.feed.ProductCard
import dev.webhunt.android.ui.product.ProductsViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ProfileScreen(
    username: String,
    profileViewModel: ProfileViewModel,
    productsViewModel: ProductsViewModel,
    authViewModel: AuthViewModel,
    onProductClick: (Int) -> Unit
) {
    var selectedTab by remember { mutableIntStateOf(0) }

    LaunchedEffect(username) {
        profileViewModel.fetchProfile(username)
    }

    when {
        profileViewModel.isLoading && profileViewModel.profileUser == null -> {
            Box(
                modifier = Modifier.fillMaxSize(),
                contentAlignment = Alignment.Center
            ) {
                CircularProgressIndicator()
            }
        }
        profileViewModel.errorMessage != null -> {
            Box(
                modifier = Modifier.fillMaxSize(),
                contentAlignment = Alignment.Center
            ) {
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    modifier = Modifier.padding(16.dp)
                ) {
                    Text(
                        text = profileViewModel.errorMessage ?: "Error",
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                        textAlign = TextAlign.Center
                    )
                    Spacer(modifier = Modifier.height(12.dp))
                    OutlinedButton(onClick = { profileViewModel.fetchProfile(username) }) {
                        Text("Retry")
                    }
                }
            }
        }
        profileViewModel.profileUser != null -> {
            val user = profileViewModel.profileUser!!
            val items = if (selectedTab == 0) profileViewModel.userProducts else profileViewModel.upvotedProducts

            LazyColumn(modifier = Modifier.fillMaxSize()) {
                // Header
                item {
                    Box {
                        // Background header
                        if (user.profileHeaderUrl != null) {
                            AsyncImage(
                                model = profileViewModel.resolveUrl(user.profileHeaderUrl),
                                contentDescription = null,
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .height(160.dp),
                                contentScale = ContentScale.Crop
                            )
                        } else {
                            Box(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .height(160.dp)
                                    .background(
                                        Brush.linearGradient(
                                            colors = listOf(
                                                MaterialTheme.colorScheme.primary,
                                                MaterialTheme.colorScheme.primary.copy(alpha = 0.6f)
                                            )
                                        )
                                    )
                            )
                        }

                        // Profile picture overlapping the header
                        Box(
                            modifier = Modifier
                                .align(Alignment.BottomCenter)
                                .offset(y = 40.dp)
                        ) {
                            AsyncImage(
                                model = profileViewModel.resolveUrl(user.profilePictureUrl),
                                contentDescription = user.username,
                                modifier = Modifier
                                    .size(80.dp)
                                    .clip(CircleShape)
                                    .border(4.dp, MaterialTheme.colorScheme.surface, CircleShape),
                                contentScale = ContentScale.Crop
                            )
                        }
                    }
                }

                // User info
                item {
                    Column(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(horizontal = 16.dp),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        Spacer(modifier = Modifier.height(48.dp))

                        if (!user.name.isNullOrBlank()) {
                            Text(
                                text = user.name,
                                style = MaterialTheme.typography.titleLarge
                            )
                        }

                        Text(
                            text = "@${user.username}",
                            style = MaterialTheme.typography.bodyMedium,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )

                        Spacer(modifier = Modifier.height(12.dp))

                        // Stats
                        Row(
                            horizontalArrangement = Arrangement.spacedBy(24.dp)
                        ) {
                            StatItem("Products", profileViewModel.userProducts.size)
                            StatItem("Upvotes", user.upvotedProductIds?.size ?: 0)
                            StatItem("Reviews", user.reviewIds?.size ?: 0)
                        }

                        Spacer(modifier = Modifier.height(16.dp))

                        // Tabs
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.spacedBy(8.dp, Alignment.CenterHorizontally)
                        ) {
                            FilterChip(
                                selected = selectedTab == 0,
                                onClick = { selectedTab = 0 },
                                label = { Text("Products") },
                                colors = FilterChipDefaults.filterChipColors(
                                    selectedContainerColor = MaterialTheme.colorScheme.primary,
                                    selectedLabelColor = MaterialTheme.colorScheme.onPrimary
                                )
                            )
                            FilterChip(
                                selected = selectedTab == 1,
                                onClick = { selectedTab = 1 },
                                label = { Text("Upvoted") },
                                colors = FilterChipDefaults.filterChipColors(
                                    selectedContainerColor = MaterialTheme.colorScheme.primary,
                                    selectedLabelColor = MaterialTheme.colorScheme.onPrimary
                                )
                            )
                        }

                        Spacer(modifier = Modifier.height(8.dp))
                    }
                }

                // Tab content
                if (items.isEmpty()) {
                    item {
                        Column(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(vertical = 40.dp),
                            horizontalAlignment = Alignment.CenterHorizontally
                        ) {
                            Icon(
                                imageVector = if (selectedTab == 0) Icons.Default.Inventory2 else Icons.Default.ThumbUp,
                                contentDescription = null,
                                modifier = Modifier.size(36.dp),
                                tint = MaterialTheme.colorScheme.onSurfaceVariant
                            )
                            Spacer(modifier = Modifier.height(8.dp))
                            Text(
                                text = if (selectedTab == 0) "No products yet" else "No upvotes yet",
                                style = MaterialTheme.typography.bodyMedium,
                                color = MaterialTheme.colorScheme.onSurfaceVariant
                            )
                        }
                    }
                } else {
                    items(items, key = { it.id }) { product ->
                        val userId = authViewModel.currentUser?.id
                        val isUpvoted = userId != null && (product.upvoteIds?.contains(userId) == true)

                        Box(modifier = Modifier.clickable { onProductClick(product.id) }) {
                            ProductCard(
                                product = product,
                                isUpvoted = isUpvoted,
                                resolveUrl = { productsViewModel.resolveUrl(it) },
                                onUpvoteClick = {
                                    userId?.let { productsViewModel.toggleUpvote(product.id, it) }
                                }
                            )
                        }
                        Divider(modifier = Modifier.padding(start = 84.dp))
                    }
                }
            }
        }
    }
}

@Composable
private fun StatItem(label: String, count: Int) {
    Column(horizontalAlignment = Alignment.CenterHorizontally) {
        Text(
            text = "$count",
            style = MaterialTheme.typography.titleMedium,
            fontWeight = FontWeight.Bold
        )
        Text(
            text = label,
            style = MaterialTheme.typography.labelSmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
    }
}
