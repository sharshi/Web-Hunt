json.extract! product, :id, :title, :tagline, :website, :upvote_ids, :review_ids, :topics
json.logoUrl url_for(product.logo)