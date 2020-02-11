import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { logger } from "redux-logger";
import { composeWithDevTools } from 'redux-devtools-extension';
import RootReducer from '../reducers/root_reducer';


const preferedState = {};

export default () => createStore(
  RootReducer,
  preferedState,
  composeWithDevTools(
    applyMiddleware(thunk, logger)
  )
)