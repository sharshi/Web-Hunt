import React from "react";
import ReactDOM from "react-dom";
import Root from "./components/root";
import configureStore from "./store/store";
import {
  fetchPopularProducts,
  fetchRecentProducts,
  fetchProduct,
  createProduct,
  updateProduct,
  deleteProduct
} from "./actions/products_actions";

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  let store;

  // DEV
  window.fetchPopularProducts = fetchPopularProducts;
  window.fetchRecentProducts = fetchRecentProducts;
  window.fetchProduct = fetchProduct;
  window.createProduct = createProduct;
  window.updateProduct = updateProduct;
  window.deleteProduct = deleteProduct;
  // DEV

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
  delete window.currentUser;

  // DEV
  window.dispatch = store.dispatch;
  // DEV

  ReactDOM.render(<Root store={store}/>, root);
})