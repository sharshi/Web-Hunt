import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app";
import { 
  getUsers, 
  getUser,
  login,
  logout
} from './utils/auth_api_util'


document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  window.getUsers = getUsers;
  window.getUser = getUser;
  window.login = login;
  window.logout = logout;

  ReactDOM.render(<App/>, root);
})