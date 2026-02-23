import SwiftUI

struct FeedView: View {
    @EnvironmentObject var productsViewModel: ProductsViewModel
    @EnvironmentObject var authViewModel: AuthViewModel

    var body: some View {
        VStack(spacing: 0) {
            // Sort toggle
            Picker("Sort", selection: $productsViewModel.sortByPopular) {
                Text("Popular").tag(true)
                Text("Newest").tag(false)
            }
            .pickerStyle(.segmented)
            .padding(.horizontal)
            .padding(.vertical, 8)

            if productsViewModel.isLoading && productsViewModel.products.isEmpty {
                Spacer()
                ProgressView("Loading products...")
                Spacer()
            } else if let error = productsViewModel.errorMessage, productsViewModel.products.isEmpty {
                Spacer()
                VStack(spacing: 12) {
                    Image(systemName: "wifi.exclamationmark")
                        .font(.system(size: 48))
                        .foregroundColor(.secondary)
                    Text(error)
                        .foregroundColor(.secondary)
                        .multilineTextAlignment(.center)
                    Button("Retry") {
                        Task { await productsViewModel.fetchProducts() }
                    }
                    .buttonStyle(.bordered)
                }
                .padding()
                Spacer()
            } else {
                ScrollView {
                    LazyVStack(spacing: 0) {
                        ForEach(Array(productsViewModel.sortedProducts.enumerated()), id: \.element.id) { index, product in
                            NavigationLink(destination: ProductDetailView(productId: product.id)) {
                                ProductCardView(
                                    product: product,
                                    rank: index + 1
                                )
                            }
                            .buttonStyle(.plain)

                            Divider()
                                .padding(.leading, 80)
                        }
                    }
                }
                .refreshable {
                    await productsViewModel.fetchProducts()
                }
            }
        }
        .task {
            if productsViewModel.products.isEmpty {
                await productsViewModel.fetchProducts()
            }
        }
    }
}
