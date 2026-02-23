import SwiftUI

struct ProductDetailView: View {
    let productId: Int

    @EnvironmentObject var productsViewModel: ProductsViewModel
    @EnvironmentObject var authViewModel: AuthViewModel
    @State private var showReviews = false

    private var product: Product? {
        productsViewModel.selectedProduct?.id == productId
            ? productsViewModel.selectedProduct
            : productsViewModel.products[productId]
    }

    private var upvoteCount: Int {
        product?.upvoteIds?.count ?? 0
    }

    private var isUpvoted: Bool {
        guard let userId = authViewModel.currentUser?.id,
              let upvoteIds = product?.upvoteIds else { return false }
        return upvoteIds.contains(userId)
    }

    var body: some View {
        ScrollView {
            if let product = product {
                VStack(alignment: .leading, spacing: 0) {
                    // Hero section
                    VStack(spacing: 16) {
                        RemoteImage(
                            url: product.logoUrl,
                            placeholder: Image(systemName: "app.fill")
                        )
                        .aspectRatio(contentMode: .fill)
                        .frame(width: 96, height: 96)
                        .clipShape(RoundedRectangle(cornerRadius: 20))
                        .overlay(
                            RoundedRectangle(cornerRadius: 20)
                                .stroke(Color.gray.opacity(0.2), lineWidth: 1)
                        )
                        .shadow(color: .black.opacity(0.1), radius: 8, y: 4)

                        Text(product.title)
                            .font(.title)
                            .fontWeight(.bold)

                        Text(product.tagline)
                            .font(.body)
                            .foregroundColor(.secondary)
                            .multilineTextAlignment(.center)

                        // Action buttons
                        HStack(spacing: 16) {
                            if let website = URL(string: product.website.hasPrefix("http") ? product.website : "https://\(product.website)") {
                                Link(destination: website) {
                                    Label("Visit", systemImage: "safari")
                                        .fontWeight(.semibold)
                                        .frame(maxWidth: .infinity)
                                        .padding(.vertical, 10)
                                }
                                .buttonStyle(.borderedProminent)
                                .tint(.orange)
                            }

                            UpvoteButton(
                                count: upvoteCount,
                                isUpvoted: isUpvoted,
                                style: .large,
                                action: {
                                    guard let userId = authViewModel.currentUser?.id else { return }
                                    Task {
                                        await productsViewModel.toggleUpvote(productId: product.id, userId: userId)
                                    }
                                }
                            )
                        }
                        .padding(.horizontal)
                    }
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 24)

                    Divider()

                    // Description
                    if let description = product.description, !description.isEmpty {
                        VStack(alignment: .leading, spacing: 8) {
                            Text("About")
                                .font(.headline)
                            Text(description)
                                .font(.body)
                                .foregroundColor(.secondary)
                        }
                        .padding(16)

                        Divider()
                    }

                    // Screenshots gallery
                    if let screenshots = product.screenshotUrls, !screenshots.isEmpty {
                        VStack(alignment: .leading, spacing: 12) {
                            Text("Screenshots")
                                .font(.headline)
                                .padding(.horizontal, 16)

                            ScrollView(.horizontal, showsIndicators: false) {
                                HStack(spacing: 12) {
                                    ForEach(screenshots, id: \.self) { url in
                                        RemoteImage(url: url)
                                            .aspectRatio(contentMode: .fill)
                                            .frame(width: 280, height: 180)
                                            .clipShape(RoundedRectangle(cornerRadius: 12))
                                            .overlay(
                                                RoundedRectangle(cornerRadius: 12)
                                                    .stroke(Color.gray.opacity(0.2), lineWidth: 1)
                                            )
                                    }
                                }
                                .padding(.horizontal, 16)
                            }
                        }
                        .padding(.vertical, 16)

                        Divider()
                    }

                    // Topics
                    if let topics = product.topics, !topics.isEmpty {
                        VStack(alignment: .leading, spacing: 8) {
                            Text("Topics")
                                .font(.headline)
                            FlowLayout(spacing: 8) {
                                ForEach(topics) { topic in
                                    Text(topic.name.capitalized)
                                        .font(.subheadline)
                                        .fontWeight(.medium)
                                        .foregroundColor(.orange)
                                        .padding(.horizontal, 12)
                                        .padding(.vertical, 6)
                                        .background(Color.orange.opacity(0.1))
                                        .clipShape(Capsule())
                                }
                            }
                        }
                        .padding(16)

                        Divider()
                    }

                    // Hunter info
                    if let hunter = product.hunter {
                        NavigationLink(destination: ProfileView(username: hunter.username)) {
                            HStack(spacing: 12) {
                                RemoteImage(
                                    url: hunter.profilePictureUrl,
                                    placeholder: Image(systemName: "person.circle.fill")
                                )
                                .aspectRatio(contentMode: .fill)
                                .frame(width: 40, height: 40)
                                .clipShape(Circle())

                                VStack(alignment: .leading, spacing: 2) {
                                    Text("Hunted by")
                                        .font(.caption)
                                        .foregroundColor(.secondary)
                                    Text("@\(hunter.username)")
                                        .font(.subheadline)
                                        .fontWeight(.semibold)
                                        .foregroundColor(.primary)
                                }

                                Spacer()

                                Image(systemName: "chevron.right")
                                    .font(.caption)
                                    .foregroundColor(.secondary)
                            }
                            .padding(16)
                        }
                        .buttonStyle(.plain)

                        Divider()
                    }

                    // Social links
                    if product.twitter != nil || product.youtube != nil {
                        VStack(alignment: .leading, spacing: 12) {
                            Text("Links")
                                .font(.headline)

                            if let twitter = product.twitter, !twitter.isEmpty {
                                if let url = URL(string: "https://twitter.com/\(twitter)") {
                                    Link(destination: url) {
                                        Label("@\(twitter)", systemImage: "bird")
                                            .foregroundColor(.blue)
                                    }
                                }
                            }

                            if let youtube = product.youtube, !youtube.isEmpty {
                                if let url = URL(string: youtube.hasPrefix("http") ? youtube : "https://youtube.com/\(youtube)") {
                                    Link(destination: url) {
                                        Label("YouTube", systemImage: "play.rectangle")
                                            .foregroundColor(.red)
                                    }
                                }
                            }
                        }
                        .padding(16)

                        Divider()
                    }

                    // Reviews section
                    ReviewsView(productId: productId)
                        .padding(16)
                }
            } else if productsViewModel.isLoading {
                VStack {
                    Spacer()
                    ProgressView()
                    Spacer()
                }
                .frame(maxWidth: .infinity, minHeight: 300)
            }
        }
        .navigationTitle(product?.title ?? "Product")
        .navigationBarTitleDisplayMode(.inline)
        .task {
            await productsViewModel.fetchProductDetail(id: productId)
        }
    }
}

// MARK: - Flow Layout for topics

struct FlowLayout: Layout {
    var spacing: CGFloat = 8

    func sizeThatFits(proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) -> CGSize {
        let result = layout(subviews: subviews, proposal: proposal)
        return result.size
    }

    func placeSubviews(in bounds: CGRect, proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) {
        let result = layout(subviews: subviews, proposal: proposal)
        for (index, position) in result.positions.enumerated() {
            subviews[index].place(at: CGPoint(x: bounds.minX + position.x, y: bounds.minY + position.y), proposal: .unspecified)
        }
    }

    private func layout(subviews: Subviews, proposal: ProposedViewSize) -> (size: CGSize, positions: [CGPoint]) {
        let maxWidth = proposal.width ?? .infinity
        var positions: [CGPoint] = []
        var currentX: CGFloat = 0
        var currentY: CGFloat = 0
        var lineHeight: CGFloat = 0
        var maxX: CGFloat = 0

        for subview in subviews {
            let size = subview.sizeThatFits(.unspecified)
            if currentX + size.width > maxWidth, currentX > 0 {
                currentX = 0
                currentY += lineHeight + spacing
                lineHeight = 0
            }
            positions.append(CGPoint(x: currentX, y: currentY))
            lineHeight = max(lineHeight, size.height)
            currentX += size.width + spacing
            maxX = max(maxX, currentX)
        }

        return (CGSize(width: maxX, height: currentY + lineHeight), positions)
    }
}
