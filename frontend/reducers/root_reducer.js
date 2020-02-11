import { combineReducers } from "redux";
import usersReducer from "./users_reducer";
import sessionsReducer from "./sessions_reducer";

const rootReducer = combineReducers({
  users: usersReducer,
  sessions: sessionsReducer
})

export default rootReducer;