import { combineReducers } from "redux";
import modalReducer from "./modal_reducer";
import feedSortReducer from "./feed_sort_reducer";

const uiReducer = combineReducers({
  modal: modalReducer,
  feedSort: feedSortReducer
})


export default uiReducer;