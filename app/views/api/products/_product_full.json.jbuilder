json.extract! product, :id, :launch_date, :title, :tagline, :description, :website, :thumbnail, :status, :youtube, :twitter, :hunter_id, :review_ids, :topic_ids
json.logoUrl url_for(product.logo)
json.upvote_ids  product.upvotes.pluck(:user_id)
json.upvotes product.upvotes.each do |upvote|
  json.set! upvote.user_id do 
    json.extract! upvote, :id, :user_id
  end
end

json.upvoters do
  product.upvoters.each do |user|
    json.set! user.id  do
      json.partial! '/api/users/user', user: user
    end
  end
end

json.screenshotUrls product.screenshots.map { |screenshot| url_for(screenshot) }
json.hunter do json.partial! '/api/users/user', user: product.hunter end