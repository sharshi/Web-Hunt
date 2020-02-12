import * as ProductsUtil from "../utils/products_api_util";

export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';
export const RECEIVE_PRODUCT = 'RECEIVE_PRODUCT';
export const PRODUCT_ERRORS = 'PRODUCT_ERRORS';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';

const receiveProducts = products => ({
  type: RECEIVE_PRODUCTS,
  products
})

const receiveProduct = product => ({
  type: RECEIVE_PRODUCT,
  product
})

const productErrors = errors => ({
  type: PRODUCT_ERRORS,
  errors
})

const removeProduct = productId => ({
  type: REMOVE_PRODUCT,
  productId
})

export const fetchPopularProducts = () => dispatch => (
  ProductsUtil.fetchPopularProducts().then(
    products => dispatch(receiveProducts(products)),
    errors => dispatch(productErrors(errors))
  )
)

export const fetchRecentProducts = () => dispatch => (
  ProductsUtil.fetchRecentProducts().then(
    products => dispatch(receiveProducts(products)),
    errors => dispatch(productErrors(errors))
  )
)

export const fetchProduct = id => dispatch => (
  ProductsUtil.fetchProduct(id).then(
    product => dispatch(receiveProduct(product)),
    errors => dispatch(productErrors(errors))
  )
)

export const createProduct = product => dispatch => (
  ProductsUtil.createProduct(product).then(
    product => dispatch(receiveProduct(product)),
    errors => dispatch(productErrors(errors))
  )
)

export const updateProduct = product => dispatch => (
  ProductsUtil.updateProduct(product).then(
    product => dispatch(receiveProduct(product)),
    errors => dispatch(productErrors(errors))
  )
)

export const deleteProduct = productId => dispatch => (
  ProductsUtil.deleteProduct(productId).then(
    product => dispatch(removeProduct(product.id)),
    errors => dispatch(productErrors(errors))
  )
)