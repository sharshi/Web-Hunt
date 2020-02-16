import React from "react";

class FeedListItem extends React.Component {
  
  clickHandler() {
    if (!this.props.fromPreview) {
      const { openModal } = this.props;
      openModal('product', this.props.product.id)
    }
  }

  render() {
    const { id, title, tagline, website, logoUrl } = this.props.product;
    
    let logoUrlPreview;
    if (this.props.fromPreview && this.props.urlFromPreview) {
      logoUrlPreview = URL.createObjectURL(this.props.urlFromPreview)
    } else {
      logoUrlPreview = logoUrl
    }

    return (
      <li className="feed-list-item" >
        <a className='feed-list-item-container' onClick={this.clickHandler.bind(this)} >
          <img src={logoUrlPreview} alt="" />
          <section>
            <h3 className='title' >{title}</h3> 
            
            <p className='tagline'>{tagline}</p>
          </section>
        </a>
        
        <section className="links">
          <a className="comments">&#128172; 34</a>
          <a className="website-link" target="_blank" href={website}>⬀</a>
          <a className="first-topic">TECHNOLOGY</a>
        </section>
        <span className="upvote">▲</span>
      </li>
    )
  }
}

export default FeedListItem;