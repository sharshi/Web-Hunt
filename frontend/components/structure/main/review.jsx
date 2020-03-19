import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from "../../../actions/session_actions";

const mstp = (state, ownProps) => {
  return {
    review: state.entities.reviews[ownProps.id],
    reviewer: state.entities.users[() => this.review.reviewer_id]
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
        
        this.props.fetchUser(review.reviewer_id)
      }
    )
  }

  render() {
    if (this.props.review === undefined && this.props.reviewer === undefined ) return null;
    const {title, body} = this.props.review;
    return (
      <article className='review'>
        <h3>{title}</h3>
        <p>{body}</p>
      </article>
    )
  }
}


export default connect(
  mstp,
  mdtp
)(Review);