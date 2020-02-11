import { RECEIVE_USER, REMOVE_USER } from "../actions/session_actions";

const defaultState = {"currentUser": {
    "id": null
  }
}

const sessionReducer = (state = defaultState, action) => {
  switch (action.type) {
    case RECEIVE_USER:
      return {
        "currentUser": {
          "id": action.user.id
        }
      }
    case REMOVE_USER:
      return defaultState;
    default:
      return state;
  }
}

export default sessionReducer;

// "session": {
//   "currentUser": {
//     "id": 25,
//       "name": "heyo cool"
//   }