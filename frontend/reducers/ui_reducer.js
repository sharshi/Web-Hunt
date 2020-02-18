import { combineReducers } from "redux";
import modalReducer from "./modal_reducer";
import feedSortReducer from "./feed_sort_reducer";
import profileUserReducer from "./profile_user_reducer";

const uiReducer = combineReducers({
  modal: modalReducer,
  feedSort: feedSortReducer,
  profileUser: profileUserReducer
})


export default uiReducer;