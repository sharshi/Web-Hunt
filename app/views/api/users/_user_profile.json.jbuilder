json.extract! user, :id, :username, :review_ids, :product_ids, :upvote_ids
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

