package dev.webhunt.android.ui.feed

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.WifiOff
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Divider
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FilterChip
import androidx.compose.material3.FilterChipDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Text
import androidx.compose.material3.Icon
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import dev.webhunt.android.ui.auth.AuthViewModel
import dev.webhunt.android.ui.product.ProductsViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun FeedScreen(
    productsViewModel: ProductsViewModel,
    authViewModel: AuthViewModel,
    onProductClick: (Int) -> Unit
) {
    LaunchedEffect(Unit) {
        if (productsViewModel.products.isEmpty()) {
            productsViewModel.fetchProducts()
        }
    }

    Column(modifier = Modifier.fillMaxSize()) {
        // Sort toggle
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp, vertical = 8.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            FilterChip(
                selected = productsViewModel.sortByPopular,
                onClick = { productsViewModel.sortByPopular = true },
                label = { Text("Popular") },
                colors = FilterChipDefaults.filterChipColors(
                    selectedContainerColor = MaterialTheme.colorScheme.primary,
                    selectedLabelColor = MaterialTheme.colorScheme.onPrimary
                )
            )
            FilterChip(
                selected = !productsViewModel.sortByPopular,
                onClick = { productsViewModel.sortByPopular = false },
                label = { Text("Newest") },
                colors = FilterChipDefaults.filterChipColors(
                    selectedContainerColor = MaterialTheme.colorScheme.primary,
                    selectedLabelColor = MaterialTheme.colorScheme.onPrimary
                )
            )
        }

        when {
            productsViewModel.isLoading && productsViewModel.products.isEmpty() -> {
                Box(
                    modifier = Modifier.fillMaxSize(),
                    contentAlignment = Alignment.Center
                ) {
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        CircularProgressIndicator()
                        Spacer(modifier = Modifier.height(8.dp))
                        Text("Loading products...")
                    }
                }
            }
            productsViewModel.errorMessage != null && productsViewModel.products.isEmpty() -> {
                Box(
                    modifier = Modifier.fillMaxSize(),
                    contentAlignment = Alignment.Center
                ) {
                    Column(
                        horizontalAlignment = Alignment.CenterHorizontally,
                        modifier = Modifier.padding(16.dp)
                    ) {
                        Icon(
                            imageVector = Icons.Default.WifiOff,
                            contentDescription = null,
                            modifier = Modifier.size(48.dp),
                            tint = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                        Spacer(modifier = Modifier.height(12.dp))
                        Text(
                            text = productsViewModel.errorMessage ?: "Error",
                            color = MaterialTheme.colorScheme.onSurfaceVariant,
                            textAlign = TextAlign.Center
                        )
                        Spacer(modifier = Modifier.height(12.dp))
                        OutlinedButton(onClick = { productsViewModel.fetchProducts() }) {
                            Text("Retry")
                        }
                    }
                }
            }
            else -> {
                val sortedProducts = productsViewModel.sortedProducts

                LazyColumn(modifier = Modifier.fillMaxSize()) {
                    itemsIndexed(
                        items = sortedProducts,
                        key = { _, product -> product.id }
                    ) { index, product ->
                        val userId = authViewModel.currentUser?.id
                        val isUpvoted = userId != null && (product.upvoteIds?.contains(userId) == true)

                        Box(
                            modifier = Modifier.clickable { onProductClick(product.id) }
                        ) {
                            ProductCard(
                                product = product,
                                rank = index + 1,
                                isUpvoted = isUpvoted,
                                resolveUrl = { productsViewModel.resolveUrl(it) },
                                onUpvoteClick = {
                                    userId?.let { productsViewModel.toggleUpvote(product.id, it) }
                                }
                            )
                        }
                        if (index < sortedProducts.lastIndex) {
                            Divider(modifier = Modifier.padding(start = 84.dp))
                        }
                    }
                }
            }
        }
    }
}
