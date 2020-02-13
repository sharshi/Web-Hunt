import React from "react";
import { Link } from "react-router-dom";

class FeedListItem extends React.Component {
  render() {
    const { id, title, tagline, website } = this.props.product;
    
    return (
      <li className="feed-list-item">
        <section>
          <img src="" alt="" />
          <section>
            <Link className='title' to={`/products/${id}`} >{title}</Link>
            
            <p className='tagline'>{tagline}</p>
            
            <a className="website-link" target="_blank" href={website}>⬀</a>
          </section>
        </section>
        
        <span className="upvote">^</span>
      </li>
    )
  }
}

export default FeedListItem;