import React from "react";
import ReactDOM from "react-dom";
import Root from "./components/root";
import configureStore from "./store/store";
import {
  fetchReview,
  fetchReviews,
  createReview
} from "./actions/review_actions";

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
  delete window.currentUser;

  // DEV
  window.dispatch = store.dispatch;
  window.fetchReview = fetchReview;
  window.fetchReviews = fetchReviews;
  window.createReview = createReview;
  // DEV

  ReactDOM.render(<Root store={store}/>, root);
})