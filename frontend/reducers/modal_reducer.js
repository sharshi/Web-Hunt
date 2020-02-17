import { OPEN_MODAL, CLOSE_MODAL } from "../actions/modal_actions";
import { RECEIVE_USER } from "../actions/session_actions";
import { RECEIVE_NEW_PRODUCT } from "../actions/products_actions";

const modalReducer = (state = [], action) => {
  switch (action.type) {
    case OPEN_MODAL:
      if (action.productId) {
        return [action.modal, action.productId]
      } else {
        return [action.modal];
      }
    case RECEIVE_NEW_PRODUCT:
      return ['product', action.product.id]
    case CLOSE_MODAL:
      return [];
    case RECEIVE_USER:
      return [];
    default:
      return state;
  }
}

export default modalReducer;