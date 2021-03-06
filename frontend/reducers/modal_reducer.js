import { OPEN_MODAL, CLOSE_MODAL } from "../actions/modal_actions";
import {
  RECEIVE_USER,
  RECEIVE_USER_PROFILE,
  RECEIVE_USER_SIGNIN
} from "../actions/session_actions";
import { RECEIVE_NEW_PRODUCT } from "../actions/products_actions";

const modalReducer = (state = [], action) => {
  switch (action.type) {
    case OPEN_MODAL:
      if (action.productId) {
        return [action.modal, action.productId];
      } else {
        return [action.modal];
      }
    case CLOSE_MODAL:
      return [];
    case RECEIVE_USER_PROFILE:
      state[0] !== "product" ? [] : Object.assign({}, state);
    // case RECEIVE_USER:
    //   return [];
    case RECEIVE_USER_SIGNIN:
      return [];
    default:
      return state;
  }
}

export default modalReducer;