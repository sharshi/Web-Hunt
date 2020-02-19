import { RECEIVE_USER_PROFILE, RECEIVE_UPDATED_USER } from "../actions/session_actions";



const profileUserReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_USER_PROFILE:
      return action.user;
    default:
      return state;
  }
}

export default profileUserReducer;