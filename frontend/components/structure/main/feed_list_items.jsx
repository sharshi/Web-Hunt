import React from "react";
import { MessageCircle, ExternalLink, Pencil, Trash2 } from 'lucide-react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as V from "../../../actions/vote_actions";
import { fetchProduct } from "../../../actions/products_actions";

class FeedListItem extends React.Component {
  
  clickHandler() {
    if (!this.props.fromPreview) {
      const { openModal } = this.props;
      openModal('product', this.props.product.id)
    }
  }

  upVote() {
     if (!this.props.fromPreview) {
       const vote = {
         upvoteable_type: "Product",
         upvoteable_id: this.props.product.id,
         user_id: this.props.loggedIn
       };

      !!this.props.loggedIn ? (
        this.props.vote(vote).then(() => {
          this.props.fetchProduct(this.props.product.id)
        })
      ) : (
          this.props.openModal('login')
      )
    }
  }

  confirmDelete(e) {
    const msg = 'Are you sure you wish to delete this cool tool';
    if (window.confirm(msg)) {
      this.props.handleDelete(e) 
    }
  }

  mine() {
    return this.props.loggedIn == this.props.product.hunter_id && this.props.fromProfile
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
    
    const editDelete = (this.mine()) ? (
      <>
        <Link className="edit-link" to={`/products/${id}/edit`}><Pencil size={14} /></Link>
        <a id={id} className="delete-link" onClick={
          this.confirmDelete.bind(this)
        }><Trash2 size={14} /></a>
      </>
    ) : (null)

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
          <a className="comments"><MessageCircle size={14} /> {
            review_ids && review_ids.length >= 0 ? review_ids.length : 8
          }</a>
          <a className="website-link" target="_blank" href={`https://${website}`}><ExternalLink size={12} /></a>
          <a className="first-topic">{topics && topics.length > 0 ? topics[0] : ''}</a>

          {editDelete}
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
// export default FeedListItem;
// const mstp = (state, ownProps) => {
//   return {
//     product: ownProps.product
//   };
// }

const mdtp = dispatch => {
  return {
    fetchProduct: id => dispatch(fetchProduct(id)),
    vote: vote => dispatch(V.vote(vote))
  };
};


export default connect(
  null,
  mdtp
)(FeedListItem);