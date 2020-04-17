import {
  RECEIVE_USERS,
  RECEIVE_USER,
  RECEIVE_RECENT_USER_IDS,
  RECEIVE_USER_SIGNIN
} from "../actions/session_actions";

const usersReducer = (state = {}, action) => {
  
  switch (action.type) {
    case RECEIVE_USERS:
      return Object.assign({}, state, action.users);
    case RECEIVE_USER:
      return Object.assign({}, state, { 
        [action.user.id]: action.user
      });
    case RECEIVE_RECENT_USER_IDS:
      return Object.assign({}, state, {
        recentIds: action.ids
      });
    case RECEIVE_USER_SIGNIN:
      debugger
      return Object.assign({}, state, { 
        [action.user.id]: action.user
      });
    default:
      return state;
  }
}

export default usersReducer;