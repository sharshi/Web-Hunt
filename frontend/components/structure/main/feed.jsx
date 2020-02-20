import React from "react";
import { NavLink, Switch, Route } from "react-router-dom";
import FeedListContainer from "./feed_list_container"

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(order) {
    this.props.sortFeed(order)
    document.cookie = `feedSort=${order}`;
  }

  render() {

    const sortButtons = (
      <span className='feed-sort-container'>
        <NavLink exact to='/' onClick={() => this.handleClick('popularIds')} activeClassName="active">POPULAR</NavLink>
        <span> | </span>
        <NavLink to='/newest' onClick={() => this.handleClick('recentIds') } activeClassName="active">NEWEST</NavLink>
      </span>
    )

    return (
      <section className="feed">
        <span className='feed-title'>
          <h1>Trending Tech Tools</h1>
          {sortButtons}
        </span>
        <FeedListContainer />
      </section>
    )
  }
}

export default Feed;