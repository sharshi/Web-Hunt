@products.each do |product|
  json.set! product.id  do
    json.partial! '/api/products/product', product: product
    #json.logoUrl url_for(product.logo)
  end
end
json.newestIds [1, 2, 3, 4]
json.popularIds [4, 2, 1, 3]