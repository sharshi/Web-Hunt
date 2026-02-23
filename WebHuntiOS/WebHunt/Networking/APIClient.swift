import Foundation

enum APIError: LocalizedError {
    case invalidURL
    case invalidResponse
    case serverError([String])
    case decodingError(Error)
    case networkError(Error)

    var errorDescription: String? {
        switch self {
        case .invalidURL: return "Invalid URL"
        case .invalidResponse: return "Invalid server response"
        case .serverError(let messages): return messages.joined(separator: ", ")
        case .decodingError(let error): return "Failed to parse response: \(error.localizedDescription)"
        case .networkError(let error): return error.localizedDescription
        }
    }
}

actor APIClient {
    static let shared = APIClient()

    // Update this to point to your Rails backend
    #if targetEnvironment(simulator)
    private let baseURL = "http://localhost:3000"
    #else
    private let baseURL = "https://webhunt.dev"
    #endif

    private let session: URLSession
    private var csrfToken: String?

    init() {
        let config = URLSessionConfiguration.default
        config.httpCookieAcceptPolicy = .always
        config.httpShouldSetCookies = true
        config.httpCookieStorage = HTTPCookieStorage.shared
        self.session = URLSession(configuration: config)
    }

    /// Fetch the CSRF token from the Rails root page meta tag.
    /// Called automatically before POST/PATCH/DELETE requests.
    private func ensureCSRFToken() async throws {
        if csrfToken != nil { return }
        guard let url = URL(string: baseURL + "/") else {
            throw APIError.invalidURL
        }
        var request = URLRequest(url: url)
        request.setValue("text/html", forHTTPHeaderField: "Accept")
        let (data, _) = try await session.data(for: request)
        if let html = String(data: data, encoding: .utf8),
           let range = html.range(of: "csrf-token\" content=\""),
           let endRange = html[range.upperBound...].range(of: "\"") {
            csrfToken = String(html[range.upperBound..<endRange.lowerBound])
        }
    }

    // MARK: - Session / Auth

    func login(username: String, password: String) async throws -> SessionResponse {
        let body: [String: Any] = [
            "user": [
                "username": username,
                "password": password
            ]
        ]
        let data = try await post(path: "/api/session", body: body)
        return try JSONDecoder().decode(SessionResponse.self, from: data)
    }

    func signup(username: String, email: String, password: String) async throws -> SessionResponse {
        let body: [String: Any] = [
            "user": [
                "username": username,
                "email": email,
                "password": password
            ]
        ]
        let data = try await post(path: "/api/users", body: body)
        return try JSONDecoder().decode(SessionResponse.self, from: data)
    }

    func logout() async throws {
        _ = try await delete(path: "/api/session")
        csrfToken = nil
    }

    // MARK: - Products

    func fetchProducts() async throws -> ProductsIndexResponse {
        let data = try await get(path: "/api/products")
        return try JSONDecoder().decode(ProductsIndexResponse.self, from: data)
    }

    func fetchProduct(id: Int) async throws -> Product {
        let data = try await get(path: "/api/products/\(id)")
        return try JSONDecoder().decode(Product.self, from: data)
    }

    func createProduct(title: String, tagline: String, website: String, description: String, hunterId: Int, logoData: Data?, logoFilename: String?) async throws -> Product {
        var fields: [String: String] = [
            "product[title]": title,
            "product[tagline]": tagline,
            "product[website]": website,
            "product[description]": description,
            "product[hunter_id]": String(hunterId),
            "product[launch_date]": ISO8601DateFormatter().string(from: Date()),
            "product[status]": "true"
        ]

        var fileFields: [(fieldName: String, data: Data, filename: String, mimeType: String)] = []
        if let logoData = logoData, let filename = logoFilename {
            fileFields.append((
                fieldName: "product[logo]",
                data: logoData,
                filename: filename,
                mimeType: "image/jpeg"
            ))
        }

        let data = try await multipartPost(path: "/api/products", fields: fields, files: fileFields)
        return try JSONDecoder().decode(Product.self, from: data)
    }

    // MARK: - Users

    func fetchUser(id: Int) async throws -> User {
        let data = try await get(path: "/api/users/\(id)")
        return try JSONDecoder().decode(User.self, from: data)
    }

    func fetchUserByUsername(username: String) async throws -> User {
        let data = try await get(path: "/api/username/\(username)")
        return try JSONDecoder().decode(User.self, from: data)
    }

    // MARK: - Reviews

    func fetchReviews(productId: Int) async throws -> [Review] {
        let data = try await get(path: "/api/products/\(productId)/reviews")
        let response = try JSONDecoder().decode(ReviewsIndexResponse.self, from: data)
        return Array(response.reviews.values).sorted { $0.id < $1.id }
    }

    func createReview(productId: Int, reviewerId: Int, body: String, parentReviewId: Int? = nil) async throws -> Review {
        var reviewBody: [String: Any] = [
            "reviewer_id": reviewerId,
            "product_id": productId,
            "body": body
        ]
        if let parentId = parentReviewId {
            reviewBody["parent_review_id"] = parentId
        }
        let body: [String: Any] = ["review": reviewBody]
        let data = try await post(path: "/api/reviews", body: body)
        return try JSONDecoder().decode(Review.self, from: data)
    }

    // MARK: - Upvotes

    func toggleUpvote(upvoteableType: String, upvoteableId: Int, userId: Int) async throws -> Bool {
        let body: [String: Any] = [
            "vote": [
                "upvoteable_type": upvoteableType,
                "upvoteable_id": upvoteableId,
                "user_id": userId
            ]
        ]
        let data = try await post(path: "/api/upvotes", body: body)
        return try JSONDecoder().decode(Bool.self, from: data)
    }

    // MARK: - HTTP Methods

    private func get(path: String) async throws -> Data {
        guard let url = URL(string: baseURL + path) else {
            throw APIError.invalidURL
        }
        var request = URLRequest(url: url)
        request.setValue("application/json", forHTTPHeaderField: "Accept")

        let (data, response) = try await session.data(for: request)
        try validateResponse(response, data: data)
        return data
    }

    private func post(path: String, body: [String: Any]) async throws -> Data {
        try await ensureCSRFToken()
        guard let url = URL(string: baseURL + path) else {
            throw APIError.invalidURL
        }
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.setValue("application/json", forHTTPHeaderField: "Accept")
        if let token = csrfToken {
            request.setValue(token, forHTTPHeaderField: "X-CSRF-Token")
        }
        request.httpBody = try JSONSerialization.data(withJSONObject: body)

        let (data, response) = try await session.data(for: request)
        try validateResponse(response, data: data)
        return data
    }

    private func delete(path: String) async throws -> Data {
        try await ensureCSRFToken()
        guard let url = URL(string: baseURL + path) else {
            throw APIError.invalidURL
        }
        var request = URLRequest(url: url)
        request.httpMethod = "DELETE"
        request.setValue("application/json", forHTTPHeaderField: "Accept")
        if let token = csrfToken {
            request.setValue(token, forHTTPHeaderField: "X-CSRF-Token")
        }

        let (data, response) = try await session.data(for: request)
        try validateResponse(response, data: data)
        return data
    }

    private func multipartPost(path: String, fields: [String: String], files: [(fieldName: String, data: Data, filename: String, mimeType: String)]) async throws -> Data {
        try await ensureCSRFToken()
        guard let url = URL(string: baseURL + path) else {
            throw APIError.invalidURL
        }

        let boundary = UUID().uuidString
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("multipart/form-data; boundary=\(boundary)", forHTTPHeaderField: "Content-Type")
        request.setValue("application/json", forHTTPHeaderField: "Accept")
        if let token = csrfToken {
            request.setValue(token, forHTTPHeaderField: "X-CSRF-Token")
        }

        var bodyData = Data()

        for (key, value) in fields {
            bodyData.append("--\(boundary)\r\n".data(using: .utf8)!)
            bodyData.append("Content-Disposition: form-data; name=\"\(key)\"\r\n\r\n".data(using: .utf8)!)
            bodyData.append("\(value)\r\n".data(using: .utf8)!)
        }

        for file in files {
            bodyData.append("--\(boundary)\r\n".data(using: .utf8)!)
            bodyData.append("Content-Disposition: form-data; name=\"\(file.fieldName)\"; filename=\"\(file.filename)\"\r\n".data(using: .utf8)!)
            bodyData.append("Content-Type: \(file.mimeType)\r\n\r\n".data(using: .utf8)!)
            bodyData.append(file.data)
            bodyData.append("\r\n".data(using: .utf8)!)
        }

        bodyData.append("--\(boundary)--\r\n".data(using: .utf8)!)
        request.httpBody = bodyData

        let (data, response) = try await session.data(for: request)
        try validateResponse(response, data: data)
        return data
    }

    private func validateResponse(_ response: URLResponse, data: Data) throws {
        guard let httpResponse = response as? HTTPURLResponse else {
            throw APIError.invalidResponse
        }

        guard (200...299).contains(httpResponse.statusCode) else {
            if let messages = try? JSONDecoder().decode([String].self, from: data) {
                throw APIError.serverError(messages)
            }
            throw APIError.serverError(["Request failed with status \(httpResponse.statusCode)"])
        }
    }
}
