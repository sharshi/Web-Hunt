import Foundation

@MainActor
final class ProductsViewModel: ObservableObject {
    @Published var products: [Int: Product] = [:]
    @Published var popularIds: [Int] = []
    @Published var recentIds: [Int] = []
    @Published var isLoading = false
    @Published var errorMessage: String?
    @Published var selectedProduct: Product?
    @Published var reviews: [Review] = []
    @Published var isLoadingReviews = false
    @Published var sortByPopular = true

    private let api = APIClient.shared

    var sortedProducts: [Product] {
        let ids = sortByPopular ? popularIds : recentIds
        return ids.compactMap { products[$0] }
    }

    func fetchProducts() async {
        isLoading = true
        errorMessage = nil

        do {
            let response = try await api.fetchProducts()
            products = response.products
            popularIds = response.popularIds
            recentIds = response.recentIds
        } catch let error as APIError {
            errorMessage = error.errorDescription
        } catch {
            errorMessage = error.localizedDescription
        }

        isLoading = false
    }

    func fetchProductDetail(id: Int) async {
        isLoading = true
        errorMessage = nil

        do {
            let product = try await api.fetchProduct(id: id)
            selectedProduct = product
            products[id] = product
        } catch let error as APIError {
            errorMessage = error.errorDescription
        } catch {
            errorMessage = error.localizedDescription
        }

        isLoading = false
    }

    func fetchReviews(productId: Int) async {
        isLoadingReviews = true

        do {
            reviews = try await api.fetchReviews(productId: productId)
        } catch {
            reviews = []
        }

        isLoadingReviews = false
    }

    func submitReview(productId: Int, reviewerId: Int, body: String) async -> Bool {
        do {
            let review = try await api.createReview(productId: productId, reviewerId: reviewerId, body: body)
            reviews.append(review)
            return true
        } catch {
            return false
        }
    }

    func toggleUpvote(productId: Int, userId: Int) async {
        guard var product = products[productId] else { return }

        // Optimistic update
        var upvoteIds = product.upvoteIds ?? []
        let wasUpvoted = upvoteIds.contains(userId)

        if wasUpvoted {
            upvoteIds.removeAll { $0 == userId }
        } else {
            upvoteIds.append(userId)
        }
        product.upvoteIds = upvoteIds
        products[productId] = product

        if selectedProduct?.id == productId {
            selectedProduct?.upvoteIds = upvoteIds
        }

        do {
            _ = try await api.toggleUpvote(
                upvoteableType: "Product",
                upvoteableId: productId,
                userId: userId
            )
        } catch {
            // Revert on failure
            if wasUpvoted {
                upvoteIds.append(userId)
            } else {
                upvoteIds.removeAll { $0 == userId }
            }
            product.upvoteIds = upvoteIds
            products[productId] = product
            if selectedProduct?.id == productId {
                selectedProduct?.upvoteIds = upvoteIds
            }
        }
    }

    func createProduct(title: String, tagline: String, website: String, description: String, hunterId: Int, logoData: Data?, logoFilename: String?) async -> Bool {
        isLoading = true
        defer { isLoading = false }

        do {
            let product = try await api.createProduct(
                title: title,
                tagline: tagline,
                website: website,
                description: description,
                hunterId: hunterId,
                logoData: logoData,
                logoFilename: logoFilename
            )
            products[product.id] = product
            recentIds.insert(product.id, at: 0)
            return true
        } catch {
            errorMessage = error.localizedDescription
            return false
        }
    }
}
