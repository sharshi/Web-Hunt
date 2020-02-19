json.extract! user, :id, :username, :review_ids, :product_ids, :upvote_ids, :upvoted_product_ids, :email, :name
json.products user.products.each do |product|
  json.set! product.id  do
    json.partial! '/api/products/product', product: product
    json.logoUrl url_for(product.logo)
  end
end
json.upvoted_products user.upvoted_products.each do |product|
  json.set! product.id  do
    json.partial! '/api/products/product', product: product
    json.logoUrl url_for(product.logo)
  end
end
if user.profile_picture.attached? 
  json.profilePictureUrl url_for(user.profile_picture) 
end

if user.profile_header.attached? 
  json.profileHeaderUrl url_for(user.profile_header) 
end
