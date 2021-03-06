// fetch popular products

export const fetchPopularProducts = () => (
  $.ajax({
    method: 'get',
    url: 'api/products/',
  })
)

// fetch recent products

export const fetchRecentProducts = () => (
  $.ajax({
    method: 'get',
    url: 'api/products/recent'
  })
)

// fetch product

export const fetchProduct = id => (
  $.ajax({
    method: 'get',
    url: `api/products/${id}`
  })
)

// create product

export const createProduct = product => {
  return $.ajax({
    method: 'post',
    url: `/api/products/`,
    data:  product ,
    contentType: false,
    processData: false
  }
)}


// update product
export const updateProduct = product => (
  $.ajax({
    method: 'patch',
    url: `api/products/${product.get('id')}`,
    data: product,
    contentType: false,
    processData: false
  })
)

// delete product
export const deleteProduct = productId => (
  $.ajax({
    method: 'delete',
    url: `api/products/${productId}`
  })
)

// url exists?

export const urlProduct = productUrl => (
  $.ajax({
    method: 'get',
    url: `api/products/hasurl?url=${productUrl}`,
  })
)

// fetch most commented product ids

export const getMostCommentedProductIds = (num = 3) =>
  $.ajax({
    method: "get",
    url: `api/products?most_commented=${num}`,
  });
