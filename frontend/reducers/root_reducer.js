import { combineReducers } from "redux";
import usersReducer from "./users_reducer";
import sessionsReducer from "./sessions_reducer";

// TODO
/**  
 * Set state shape as determined here:
 * https://github.com/sharshi/Web-Hunt/wiki/sample-state
 * root
 * - entities
 * -- products
 * -- users
 * -- reviews
 * -- topics
 * -- productsTopics
 * - ui
 * - errors
 * - session
 */

const rootReducer = combineReducers({
  users: usersReducer,
  sessions: sessionsReducer
})

export default rootReducer;