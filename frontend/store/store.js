import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { logger } from "redux-logger";
import RootReducer from '../reducers/root_reducer';


const preferedState = {};

export default () => createStore(
  RootReducer,
  preferedState,
  applyMiddleware(thunk, logger)
)