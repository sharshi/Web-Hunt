import { OPEN_USER_MENU, CLOSE_USER_MENU } from "../actions/navbar_actions";



const navBarReducer = (state = 'closed', action) => {
  switch (action.type) {
    case OPEN_USER_MENU:
      return 'opened';
    case CLOSE_USER_MENU:
      return 'closed';
    default:
      return state;
  }
}

export default navBarReducer;