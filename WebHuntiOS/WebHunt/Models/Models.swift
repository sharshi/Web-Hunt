import Foundation

// MARK: - User

struct User: Codable, Identifiable {
    let id: Int
    let username: String
    let email: String
    var name: String?
    var profilePictureUrl: String?
    var profileHeaderUrl: String?
    var productIds: [Int]?
    var reviewIds: [Int]?
    var upvoteIds: [Int]?
    var upvotedProductIds: [Int]?
    var products: [Int: Product]?
    var upvotedProducts: [Int: Product]?

    enum CodingKeys: String, CodingKey {
        case id, username, email, name, products
        case profilePictureUrl, profileHeaderUrl
        case productIds = "product_ids"
        case reviewIds = "review_ids"
        case upvoteIds = "upvote_ids"
        case upvotedProductIds = "upvoted_product_ids"
        case upvotedProducts = "upvoted_products"
    }
}

// MARK: - Product

struct Product: Codable, Identifiable {
    let id: Int
    let title: String
    let tagline: String
    let website: String
    var description: String?
    var logoUrl: String?
    var launchDate: String?
    var thumbnail: String?
    var status: Bool?
    var youtube: String?
    var twitter: String?
    var hunterId: Int
    var reviewIds: [Int]?
    var topicIds: [Int]?
    var topics: [Topic]?
    var upvoteIds: [Int]?
    var screenshotUrls: [String]?
    var hunter: User?
    var upvoters: [String: User]?

    enum CodingKeys: String, CodingKey {
        case id, title, tagline, website, description, thumbnail, status
        case youtube, twitter, topics, hunter, upvoters
        case logoUrl
        case launchDate = "launch_date"
        case hunterId = "hunter_id"
        case reviewIds = "review_ids"
        case topicIds = "topic_ids"
        case upvoteIds = "upvote_ids"
        case screenshotUrls
    }
}

// MARK: - Review

struct Review: Codable, Identifiable {
    let id: Int
    let reviewerId: Int
    let productId: Int
    let body: String
    var parentReviewId: Int?
    let createdAt: String
    let updatedAt: String

    enum CodingKeys: String, CodingKey {
        case id, body
        case reviewerId = "reviewer_id"
        case productId = "product_id"
        case parentReviewId = "parent_review_id"
        case createdAt = "created_at"
        case updatedAt = "updated_at"
    }
}

// MARK: - Topic

struct Topic: Codable, Identifiable {
    let id: Int
    let name: String
}

// MARK: - Upvote

struct Upvote: Codable, Identifiable {
    let id: Int
    let userId: Int

    enum CodingKeys: String, CodingKey {
        case id
        case userId = "user_id"
    }
}

// MARK: - API Response types

struct ProductsIndexResponse: Codable {
    let products: [Int: Product]
    let recentIds: [Int]
    let popularIds: [Int]

    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: DynamicCodingKey.self)
        var products = [Int: Product]()
        var recentIds = [Int]()
        var popularIds = [Int]()

        for key in container.allKeys {
            if key.stringValue == "recentIds" {
                recentIds = try container.decode([Int].self, forKey: key)
            } else if key.stringValue == "popularIds" {
                popularIds = try container.decode([Int].self, forKey: key)
            } else if let intKey = Int(key.stringValue) {
                let product = try container.decode(Product.self, forKey: key)
                products[intKey] = product
            }
        }

        self.products = products
        self.recentIds = recentIds
        self.popularIds = popularIds
    }
}

struct ReviewsIndexResponse: Codable {
    let reviews: [Int: Review]

    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: DynamicCodingKey.self)
        var reviews = [Int: Review]()
        for key in container.allKeys {
            if let intKey = Int(key.stringValue) {
                let review = try container.decode(Review.self, forKey: key)
                reviews[intKey] = review
            }
        }
        self.reviews = reviews
    }
}

struct SessionResponse: Codable {
    let id: Int
    let username: String
    let email: String
    var name: String?
    var profilePictureUrl: String?
    var profileHeaderUrl: String?
}

struct DynamicCodingKey: CodingKey {
    var stringValue: String
    var intValue: Int?

    init?(stringValue: String) {
        self.stringValue = stringValue
        self.intValue = Int(stringValue)
    }

    init?(intValue: Int) {
        self.stringValue = String(intValue)
        self.intValue = intValue
    }
}
