import { combineReducers } from "redux";
import productsReducer from "./products_reducer";
import usersReducer from "./users_reducer";
import reviewsReducer from "./reviews_reducer";
import topicsReducer from "./topics_reducer";
import productsTopicsReducer from "./products_topics_reducer";


const entitiesReducer = combineReducers({
  products: productsReducer,
  users: usersReducer,
  reviews: reviewsReducer,
  topics: topicsReducer,
  productsTopics: productsTopicsReducer
})

export default entitiesReducer;