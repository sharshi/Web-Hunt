json.extract! product, :id, :title, :tagline, :website, :review_ids, :topics, :hunter_id
json.logoUrl url_for(product.logo)
json.upvote_ids product.upvotes.pluck(:user_id)