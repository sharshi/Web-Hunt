import SwiftUI

struct RemoteImage: View {
    let url: String?
    var placeholder: Image = Image(systemName: "photo")

    @State private var uiImage: UIImage?
    @State private var isLoading = false

    var body: some View {
        Group {
            if let uiImage = uiImage {
                Image(uiImage: uiImage)
                    .resizable()
            } else if isLoading {
                ProgressView()
            } else {
                placeholder
                    .resizable()
                    .foregroundColor(.gray.opacity(0.3))
            }
        }
        .task {
            await loadImage()
        }
    }

    private func loadImage() async {
        guard let urlString = url, let imageURL = URL(string: urlString) else { return }

        if let cached = ImageCache.shared.get(for: urlString) {
            self.uiImage = cached
            return
        }

        isLoading = true
        defer { isLoading = false }

        do {
            let (data, _) = try await URLSession.shared.data(from: imageURL)
            if let image = UIImage(data: data) {
                ImageCache.shared.set(image, for: urlString)
                await MainActor.run {
                    self.uiImage = image
                }
            }
        } catch {
            // Silently fail — placeholder will show
        }
    }
}

final class ImageCache {
    static let shared = ImageCache()
    private let cache = NSCache<NSString, UIImage>()

    private init() {
        cache.countLimit = 200
    }

    func get(for key: String) -> UIImage? {
        cache.object(forKey: key as NSString)
    }

    func set(_ image: UIImage, for key: String) {
        cache.setObject(image, forKey: key as NSString)
    }
}
