import React from "react";
import { Link, NavLink } from "react-router-dom";

class Feed extends React.Component {
  render() {
    return (
      <section className="feed">
        <span>
          <NavLink exact to='/' activeClassName="active">POPULAR</NavLink>
          <span> | </span>
          <NavLink to='/newest' activeClassName="active">NEWEST</NavLink>
        </span>
        {/* feedListItems */}
      </section>
    )
  }
}

export default Feed;