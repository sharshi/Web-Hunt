import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { logger } from "redux-logger";
import { composeWithDevTools } from 'redux-devtools-extension';
import RootReducer from '../reducers/root_reducer';

export default (preloadedState= {}) => createStore(
  RootReducer,
  preloadedState,
  composeWithDevTools(
    applyMiddleware(thunk, logger)
  )
)