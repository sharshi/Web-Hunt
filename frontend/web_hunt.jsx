import React from "react";
import ReactDOM from "react-dom";
import Root from "./components/root";
import configureStore from "./store/store";
import { 
  getUsers, 
  getUser,
  login,
  logout
} from './utils/auth_api_util';


document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  const store = configureStore();

  // <-- DEV
  window.getUsers = getUsers;
  window.getUser = getUser;
  window.login = login;
  window.logout = logout;
  // DEV -->

  ReactDOM.render(<Root store={store}/>, root);
})