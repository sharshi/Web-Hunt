json.array! @products do |product|
  json.extract! product, :id, :title
  json.logoUrl url_for(product.logo)
end