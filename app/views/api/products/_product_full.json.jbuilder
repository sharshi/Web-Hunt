json.extract! product, :id, :launch_date, :title, :tagline, :description, :website, :thumbnail, :status, :youtube, :twitter, :hunter_id, :review_ids, :topic_ids, :upvote_ids
json.logoUrl url_for(product.logo)
json.screenshotUrls product.screenshots.map do |screenshot|
   url_for(screenshot)
end
json.hunter do json.partial! '/api/users/user', user: product.hunter end