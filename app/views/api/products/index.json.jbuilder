@products.each do |product|
  json.set! product.id do
    json.partial! '/api/products/product', product: product
    json.logoUrl url_for(product.logo)
  end
end
json.recentIds Product.order(created_at: :desc).pluck(:id)
json.popularIds @popular