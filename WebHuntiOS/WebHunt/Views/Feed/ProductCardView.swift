import SwiftUI

struct ProductCardView: View {
    let product: Product
    var rank: Int? = nil

    @EnvironmentObject var authViewModel: AuthViewModel
    @EnvironmentObject var productsViewModel: ProductsViewModel

    private var upvoteCount: Int {
        product.upvoteIds?.count ?? 0
    }

    private var isUpvoted: Bool {
        guard let userId = authViewModel.currentUser?.id,
              let upvoteIds = product.upvoteIds else { return false }
        return upvoteIds.contains(userId)
    }

    var body: some View {
        HStack(alignment: .center, spacing: 12) {
            // Product logo
            RemoteImage(
                url: product.logoUrl,
                placeholder: Image(systemName: "app.fill")
            )
            .aspectRatio(contentMode: .fill)
            .frame(width: 56, height: 56)
            .clipShape(RoundedRectangle(cornerRadius: 12))
            .overlay(
                RoundedRectangle(cornerRadius: 12)
                    .stroke(Color.gray.opacity(0.2), lineWidth: 1)
            )

            // Product info
            VStack(alignment: .leading, spacing: 4) {
                HStack(spacing: 6) {
                    if let rank = rank {
                        Text("#\(rank)")
                            .font(.caption)
                            .fontWeight(.bold)
                            .foregroundColor(.orange)
                    }
                    Text(product.title)
                        .font(.headline)
                        .foregroundColor(.primary)
                        .lineLimit(1)
                }

                Text(product.tagline)
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                    .lineLimit(2)

                if let topics = product.topics, !topics.isEmpty {
                    HStack(spacing: 4) {
                        ForEach(topics.prefix(3)) { topic in
                            Text(topic.name.uppercased())
                                .font(.system(size: 9, weight: .semibold))
                                .foregroundColor(.orange)
                                .padding(.horizontal, 6)
                                .padding(.vertical, 2)
                                .background(Color.orange.opacity(0.1))
                                .clipShape(Capsule())
                        }
                    }
                    .padding(.top, 2)
                }
            }

            Spacer()

            // Upvote button
            UpvoteButton(
                count: upvoteCount,
                isUpvoted: isUpvoted,
                action: {
                    guard let userId = authViewModel.currentUser?.id else { return }
                    Task {
                        await productsViewModel.toggleUpvote(productId: product.id, userId: userId)
                    }
                }
            )
        }
        .padding(.horizontal, 16)
        .padding(.vertical, 12)
    }
}
