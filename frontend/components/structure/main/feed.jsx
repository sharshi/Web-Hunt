import React from "react";
import { Link } from "react-router-dom";

class Feed extends React.Component {
  render() {
    return (
      <section className="feed">
        <span>
          <Link to='/' >POPULAR</Link>
          <Link to='/newest' >NEWEST</Link>
        </span>
        {/* feedListItems */}
      </section>
    )
  }
}

export default Feed;