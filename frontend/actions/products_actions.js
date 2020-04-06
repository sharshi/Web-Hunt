import * as ProductsUtil from "../utils/products_api_util";

export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';
export const RECEIVE_PRODUCT = 'RECEIVE_PRODUCT';
export const RECEIVE_NEW_PRODUCT = 'RECEIVE_NEW_PRODUCT';
export const RECEIVE_PRODUCT_ERRORS = 'RECEIVE_PRODUCT_ERRORS';
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const RECEIVE_MOST_COMMENTED_PRODUCT_IDS =
         "RECEIVE_MOST_COMMENTED_PRODUCT_IDS";


const receiveProducts = products => ({
  type: RECEIVE_PRODUCTS,
  products
})

const receiveProduct = product => ({
  type: RECEIVE_PRODUCT,
  product
})

const receiveNewProduct = product => ({
  type: RECEIVE_NEW_PRODUCT,
  product
})

const productErrors = errors => ({
  type: RECEIVE_PRODUCT_ERRORS,
  errors
})

const removeProduct = productId => ({
  type: REMOVE_PRODUCT,
  productId
})

const receiveMostCommentedProductIds = (productIds) => ({
  type: RECEIVE_MOST_COMMENTED_PRODUCT_IDS,
  productIds,
});

export const fetchPopularProducts = () => dispatch => (
  ProductsUtil.fetchPopularProducts().then(
    products => dispatch(receiveProducts(products)),
    errors => dispatch(productErrors(errors.responseJSON))
  )
)

export const fetchProduct = id => dispatch => (
  ProductsUtil.fetchProduct(id).then(
    product => dispatch(receiveProduct(product)),
    errors => dispatch(productErrors(errors.responseJSON))
  )
)

export const createProduct = product => dispatch => (
  ProductsUtil.createProduct(product).then(
    product => dispatch(receiveNewProduct(product)),
    errors => dispatch(productErrors(errors.responseJSON))
  )
)

export const updateProduct = product => dispatch => (
  ProductsUtil.updateProduct(product).then(
    product => dispatch(receiveNewProduct(product)),
    errors => dispatch(productErrors(errors.responseJSON))
  )
)

export const deleteProduct = productId => dispatch => (
  ProductsUtil.deleteProduct(productId).then(
    product => dispatch(removeProduct(product.id)),
    errors => dispatch(productErrors(errors.responseJSON))
  )
)

export const fetchMostCommentedProductIds = (num) => (dispatch) =>
  ProductsUtil.getMostCommentedProductIds(num).then(
    (productIds) => dispatch(receiveMostCommentedProductIds(productIds)),
    (errors) => dispatch(productErrors(errors.responseJSON))
  );
