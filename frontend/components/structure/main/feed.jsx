import React from "react";
import { NavLink } from "react-router-dom";
import FeedListContainer from "./feed_list_container"

class Feed extends React.Component {
  render() {

    const sortButtons = (
      <span className='feed-sort-container'>
        <NavLink exact to='/' activeClassName="active">POPULAR</NavLink>
        <span> | </span>
        <NavLink to='/newest' activeClassName="active">NEWEST</NavLink>
      </span>
    )

    return (
      <section className="feed">
        {sortButtons}
        <FeedListContainer />
      </section>
    )
  }
}

export default Feed;