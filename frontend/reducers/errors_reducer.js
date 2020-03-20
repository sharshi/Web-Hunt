import {
  RECEIVE_SESSION_ERRORS,
  RECEIVE_USER_SIGNIN,
  CLEAR_ERRORS
} from "../actions/session_actions"; import { RECEIVE_PRODUCT_ERRORS } from "../actions/products_actions";

const _default = {
  "login": [],
  "product": []
}

const errorsReducer = (state = _default, action) => {
  switch (action.type) {
    case RECEIVE_SESSION_ERRORS:
      return { 
        "login": action.errors, 
        "product":[] 
      };
    case RECEIVE_PRODUCT_ERRORS:
      return { 
        "login": [], 
        "product": action.errors 
      };
    case RECEIVE_USER_SIGNIN:
      return _default;
    case CLEAR_ERRORS:
      return _default;
    default:
      return state;
  }
}

export default errorsReducer;