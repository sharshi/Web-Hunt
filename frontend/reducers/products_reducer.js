import { RECEIVE_PRODUCTS, RECEIVE_PRODUCT, RECEIVE_NEW_PRODUCT, PRODUCT_ERRORS, REMOVE_PRODUCT } from "../actions/products_actions";

const preState = {
  recentIds: [],
  popularIds: []
}

const productsReducer = (state = preState, action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      // get new sorting ids
      const { recentIds, popularIds } = action.products;
      
      // duplicates the state
      let newS = Object.assign({}, state, action.products);
      
      // adds unique recentIds
      newS['recentIds'] = 
        [...new Set([...recentIds, ...state.recentIds])]

      // adds unique popularIds
      newS['popularIds'] = 
        [...new Set([...popularIds, ...state.popularIds])]

      return newS;
    case RECEIVE_PRODUCT:
      return Object.assign({}, state, { [action.product.id]: action.product })
    case RECEIVE_NEW_PRODUCT:
      return Object.assign({}, state, { [action.product.id]: action.product })
    case REMOVE_PRODUCT:
      newS = Object.assign({}, state)
      delete newS[action.productId]
      return newS;
    default:
      return state;
  }
}

export default productsReducer;