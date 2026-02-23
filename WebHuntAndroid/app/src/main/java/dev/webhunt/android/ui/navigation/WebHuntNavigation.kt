package dev.webhunt.android.ui.navigation

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Logout
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.PersonOutline
import androidx.compose.material.icons.filled.Whatshot
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.NavigationBarItemDefaults
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.rememberModalBottomSheetState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import dev.webhunt.android.ui.auth.AuthViewModel
import dev.webhunt.android.ui.auth.LoginScreen
import dev.webhunt.android.ui.auth.SignupScreen
import dev.webhunt.android.ui.feed.FeedScreen
import dev.webhunt.android.ui.product.NewProductScreen
import dev.webhunt.android.ui.product.ProductDetailScreen
import dev.webhunt.android.ui.product.ProductsViewModel
import dev.webhunt.android.ui.profile.ProfileScreen
import dev.webhunt.android.ui.profile.ProfileViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun WebHuntNavigation() {
    val navController = rememberNavController()
    val authViewModel: AuthViewModel = hiltViewModel()
    val productsViewModel: ProductsViewModel = hiltViewModel()

    var selectedTab by remember { mutableIntStateOf(0) }
    var showAuthSheet by remember { mutableStateOf(false) }
    var showNewProduct by remember { mutableStateOf(false) }
    var showMenu by remember { mutableStateOf(false) }
    var authIsLogin by remember { mutableStateOf(true) }

    // Auth bottom sheet
    if (showAuthSheet) {
        ModalBottomSheet(
            onDismissRequest = { showAuthSheet = false },
            sheetState = rememberModalBottomSheetState(skipPartiallyExpanded = true)
        ) {
            if (authIsLogin) {
                LoginScreen(
                    authViewModel = authViewModel,
                    onSwitchToSignup = { authIsLogin = false }
                )
            } else {
                SignupScreen(
                    authViewModel = authViewModel,
                    onSwitchToLogin = { authIsLogin = true }
                )
            }
            // Auto-dismiss on successful auth
            if (authViewModel.isAuthenticated) {
                showAuthSheet = false
            }
        }
    }

    // New Product full-screen
    if (showNewProduct) {
        NewProductScreen(
            productsViewModel = productsViewModel,
            authViewModel = authViewModel,
            onDismiss = { showNewProduct = false }
        )
        return
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Web Hunt", fontWeight = FontWeight.Bold) },
                actions = {
                    if (authViewModel.isAuthenticated) {
                        Box {
                            IconButton(onClick = { showMenu = true }) {
                                Icon(Icons.Default.Person, contentDescription = "Menu")
                            }
                            DropdownMenu(
                                expanded = showMenu,
                                onDismissRequest = { showMenu = false }
                            ) {
                                DropdownMenuItem(
                                    text = { Text("New Product") },
                                    onClick = {
                                        showMenu = false
                                        showNewProduct = true
                                    },
                                    leadingIcon = { Icon(Icons.Default.Add, contentDescription = null) }
                                )
                                DropdownMenuItem(
                                    text = { Text("Log Out") },
                                    onClick = {
                                        showMenu = false
                                        authViewModel.logout()
                                    },
                                    leadingIcon = {
                                        Icon(
                                            Icons.Default.Logout,
                                            contentDescription = null,
                                            tint = MaterialTheme.colorScheme.error
                                        )
                                    }
                                )
                            }
                        }
                    } else {
                        TextButton(onClick = {
                            authIsLogin = true
                            showAuthSheet = true
                        }) {
                            Text("Sign In", fontWeight = FontWeight.SemiBold)
                        }
                    }
                }
            )
        },
        bottomBar = {
            NavigationBar {
                NavigationBarItem(
                    selected = selectedTab == 0,
                    onClick = {
                        selectedTab = 0
                        navController.navigate("feed") {
                            popUpTo("feed") { inclusive = true }
                        }
                    },
                    icon = { Icon(Icons.Default.Whatshot, contentDescription = "Feed") },
                    label = { Text("Feed") },
                    colors = NavigationBarItemDefaults.colors(
                        selectedIconColor = MaterialTheme.colorScheme.primary,
                        selectedTextColor = MaterialTheme.colorScheme.primary
                    )
                )
                NavigationBarItem(
                    selected = selectedTab == 1,
                    onClick = {
                        selectedTab = 1
                        if (authViewModel.isAuthenticated) {
                            navController.navigate("profile/${authViewModel.currentUser?.username}") {
                                popUpTo("feed")
                            }
                        } else {
                            navController.navigate("profile_placeholder") {
                                popUpTo("feed")
                            }
                        }
                    },
                    icon = {
                        Icon(
                            if (selectedTab == 1) Icons.Default.Person else Icons.Default.PersonOutline,
                            contentDescription = "Profile"
                        )
                    },
                    label = { Text("Profile") },
                    colors = NavigationBarItemDefaults.colors(
                        selectedIconColor = MaterialTheme.colorScheme.primary,
                        selectedTextColor = MaterialTheme.colorScheme.primary
                    )
                )
            }
        }
    ) { padding ->
        NavHost(
            navController = navController,
            startDestination = "feed",
            modifier = Modifier.padding(padding)
        ) {
            composable("feed") {
                FeedScreen(
                    productsViewModel = productsViewModel,
                    authViewModel = authViewModel,
                    onProductClick = { productId ->
                        navController.navigate("product/$productId")
                    }
                )
            }

            composable(
                "product/{productId}",
                arguments = listOf(navArgument("productId") { type = NavType.IntType })
            ) { backStackEntry ->
                val productId = backStackEntry.arguments?.getInt("productId") ?: return@composable
                ProductDetailScreen(
                    productId = productId,
                    productsViewModel = productsViewModel,
                    authViewModel = authViewModel,
                    onBack = { navController.popBackStack() },
                    onProfileClick = { username ->
                        navController.navigate("profile/$username")
                    }
                )
            }

            composable(
                "profile/{username}",
                arguments = listOf(navArgument("username") { type = NavType.StringType })
            ) { backStackEntry ->
                val username = backStackEntry.arguments?.getString("username") ?: return@composable
                val profileViewModel: ProfileViewModel = hiltViewModel()
                ProfileScreen(
                    username = username,
                    profileViewModel = profileViewModel,
                    productsViewModel = productsViewModel,
                    authViewModel = authViewModel,
                    onProductClick = { productId ->
                        navController.navigate("product/$productId")
                    }
                )
            }

            composable("profile_placeholder") {
                Box(
                    modifier = Modifier.fillMaxSize(),
                    contentAlignment = Alignment.Center
                ) {
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Icon(
                            imageVector = Icons.Default.PersonOutline,
                            contentDescription = null,
                            modifier = Modifier.size(64.dp),
                            tint = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                        Spacer(modifier = Modifier.height(16.dp))
                        Text(
                            "Sign in to view your profile",
                            style = MaterialTheme.typography.titleMedium,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                        Spacer(modifier = Modifier.height(12.dp))
                        TextButton(onClick = {
                            authIsLogin = true
                            showAuthSheet = true
                        }) {
                            Text("Sign In")
                        }
                    }
                }
            }
        }
    }
}
