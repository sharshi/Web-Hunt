import React from 'react';
import { connect } from 'react-redux';

const mstp = (state, ownProps) => {
  return {
    review: state.entities.reviews[ownProps.id]
  };
}

const mdtp = dispatch => {
  return {
    fetchReview: id => dispatch(fetchReview(id))
  };
};

class Review extends React.Component {
  componentDidMount() {
    this.props.fetchReview(this.props.id);
  }

  render() {
    if (this.props.review === undefined) return null;
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