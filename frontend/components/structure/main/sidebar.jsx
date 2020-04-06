import React from 'react';
import { connect } from 'react-redux';
import { fetchRecentUserIds } from "../../../actions/session_actions";
import { fetchMostCommentedProductIds } from "../../../actions/products_actions";
import RecentUser from './recent_user';
import ProductSmall from './product_small';
import { Link } from 'react-router-dom';

class SideBar extends React.Component {

  componentDidMount() {
    this.props.fetchRecentUserIds();
    this.props.fetchMostCommentedProductIds();    
  }

  render() {
    const { recentUserIds, mostCommentedIds } = this.props;
    // if (!recentUserIds ) return null;

    const users = recentUserIds ? recentUserIds.map(id => (
      <RecentUser key={`recent-user-${id}`} id={id} />
    )) : [];

    const products = mostCommentedIds ? mostCommentedIds.map(id => (
      <ProductSmall key={`product-small-${id}`} id={id} />
    )) : [];

    return (
      <aside className='feed'>
        <h3>Recent Users</h3>
        <section>
          {users}
        </section>
        <h3>Most Commented</h3>
        <section>
          {products}
        </section>
      </aside>
    )
  }
}

const mstp = state => ({
  recentUserIds: state.entities.users.recentIds,
  mostCommentedIds: state.entities.products.mostCommentedProductIds
})

const mdtp = dispatch => ({
  fetchRecentUserIds: () => dispatch(fetchRecentUserIds()),
  fetchMostCommentedProductIds: (num) => dispatch(fetchMostCommentedProductIds(num))
})

export default connect(
  mstp,
  mdtp
)(SideBar);