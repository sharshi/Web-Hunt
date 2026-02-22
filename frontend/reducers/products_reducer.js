import { RECEIVE_PRODUCTS, RECEIVE_PRODUCT, RECEIVE_NEW_PRODUCT, REMOVE_PRODUCT, RECEIVE_MOST_COMMENTED_PRODUCT_IDS } from "../actions/products_actions";

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
      newS["recentIds"] = [...new Set([...recentIds, ...state.recentIds])];

      // adds unique popularIds
      newS["popularIds"] = [...new Set([...popularIds, ...state.popularIds])];

      return newS;
    case RECEIVE_PRODUCT:
      return Object.assign({}, state, { [action.product.id]: action.product });
    case REMOVE_PRODUCT:
      newS = Object.assign({}, state);
      delete newS[action.productId];
      return newS;
    case RECEIVE_MOST_COMMENTED_PRODUCT_IDS:
      return Object.assign({}, state, {
        mostCommentedProductIds: action.productIds,
      });
    default:
      return state;
  }
}

export default productsReducer;