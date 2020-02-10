import { combineReducers } from "redux";
import usersReducer from "./users_reducer";

const rootReducer = combineReducers({
  users: usersReducer
})

export default rootReducer;