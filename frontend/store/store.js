import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { logger } from "redux-logger";
import { composeWithDevTools } from 'redux-devtools-extension';
import RootReducer from '../reducers/root_reducer';

let middleware = [thunk];

if (process.env.NODE_ENV !== 'production') {
  console.log(process.env.NODE_ENV);
  middleware = middleware.concat(logger);
}

export default (preloadedState = {}) =>
  createStore(
    RootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(...middleware))
  );