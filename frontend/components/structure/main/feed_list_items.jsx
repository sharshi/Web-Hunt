import React from "react";
import { Link } from "react-router-dom";

class FeedListItem extends React.Component {
  
  render() {
    const { id, title, tagline, website, logoUrl } = this.props.product;
    
    const { openModal } = this.props;

    return (
      <li className="feed-list-item" >
        <Link className='feed-list-item-container'  onClick={() => dispatch(openModal(id))} to={`/products/${id}`} >
          <img src={logoUrl} alt="" />
          <section>
            <h3 className='title' >{title}</h3> 
            
            <p className='tagline'>{tagline}</p>
            
            <a className="website-link" target="_blank" href={website}>⬀</a>
          </section>
        </Link>
        
        <span className="upvote">▲</span>
      </li>
    )
  }
}

export default FeedListItem;