import React from "react";
import ReactDOM from "react-dom";
import Root from "./components/root";
import configureStore from "./store/store";
import {
  login,
  logout
} from './utils/auth_api_util';
import {
  fetchUsers,
  fetchUser
} from './actions/user_actions';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  let store;

  if (window.currentUser) {
    const preloadedState = {
      entities: {
        users: {
          [currentUser.id]: currentUser
        }
      },
      session: {
        "currentUser": {
          id: currentUser.id,
          username: currentUser.username
        }
      }
    };
    store = configureStore(preloadedState);
  } else {
    store = configureStore();
  }

  // <-- DEV
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.fetchUsers = fetchUsers;
  window.fetchUser = fetchUser;
  window.login = login;
  window.logout = logout;
  // DEV -->

  ReactDOM.render(<Root store={store}/>, root);
})