import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from "../../../actions/session_actions";
import { fetchReview } from "../../../actions/review_actions";
import { Link } from 'react-router-dom';

const mstp = (state, ownProps) => {
  return {
    review: state.entities.reviews[ownProps.id],
    reviewer: state.entities.users[()=>this.review.reviewer_id]
  };
}

const mdtp = dispatch => {
  return {
    fetchReview: id => dispatch(fetchReview(id)),
    fetchUser: id => dispatch(fetchUser(id)),
  };
};

class Review extends React.Component {
  componentDidMount() {
    this.props.fetchReview(this.props.id).then(
      ({review}) => {
        this.props.fetchUser(review.reviewer_id).then(user => {
          this.setState({...user})
        })
      }
    )
  }

  render() {
    if ( !this.props.review ) return null;
    if ( !this.state ) return null;

    const { body, product_id, product_title } = this.props.review;
    const { profilePictureUrl, username } = this.state.user;
    return (
      <article className='review'>
        <img className='ppr' src={profilePictureUrl} alt=""/>
        <section className='review-body'>
          <h3>{this.props.fromProfile ? <Link to={`/products/${product_id}`} >{product_title}</Link> : <Link to={`/@${username}/reviews`} >@{username}</Link>}</h3>
          <p>{body}</p>
        </section>
      </article>
    )
  }
}


export default connect(
  mstp,
  mdtp
)(Review);