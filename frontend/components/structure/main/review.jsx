import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from "../../../actions/session_actions";

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

    const {title, body} = this.props.review;
    const { profilePictureUrl, username } = this.state.user;
    return (
      <article className='review'>
        <img className='ppr' src={profilePictureUrl} alt=""/>
        <h3>{title}</h3>
        <small>Author: {username}</small>
        <p>{body}</p>
      </article>
    )
  }
}


export default connect(
  mstp,
  mdtp
)(Review);