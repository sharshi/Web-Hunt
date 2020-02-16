import { SORT_FEED } from "../actions/feed_actions";

const order = document.cookie.split('feedSort=')[1] || 'popularIds';
const feedSortReducer = (state = order, action) => {
  switch (action.type) {
    case SORT_FEED:
      return action.order;
    default:
      return state;
  }
}

export default feedSortReducer;