import React from "react";

class FeedListItem extends React.Component {
  
  clickHandler() {
    if (!this.props.fromPreview) {
      const { openModal } = this.props;
      openModal('product', this.props.product.id)
    }
  }

  upVote() {
    !!this.props.loggedIn ? (
      null
    ) : (
      this.props.openModal('login')
    )
  }

  render() {
    const { id, title, tagline, website, logoUrl, upvote_ids, review_ids, topics } = this.props.product;
    
    let logoUrlPreview;
    if (this.props.fromPreview && this.props.urlFromPreview) {
      logoUrlPreview = URL.createObjectURL(this.props.urlFromPreview)
    } else {
      logoUrlPreview = logoUrl
    }


    const upvoted = upvote_ids ? upvote_ids.includes(this.props.loggedIn) : true
    
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
          <a className="comments"><i className="fas fa-comment"></i> {
            review_ids && review_ids.length >= 0 ? review_ids.length : 8
          }</a>
          <a className="website-link" target="_blank" href={website}><i className="fas fa-external-link-alt fa-xs"></i></a>
          <a className="first-topic">{topics && topics.length > 0 ? topics[0] : 'Technology'}</a>
        </section>
        <span onClick={this.upVote.bind(this)} className={upvoted ? "upvote active" : "upvote"}>
          ▲
          <br/>
          {upvote_ids && upvote_ids.length >= 0 ? upvote_ids.length : 74 }
        </span>
      </li>
    )
  }
}

export default FeedListItem;