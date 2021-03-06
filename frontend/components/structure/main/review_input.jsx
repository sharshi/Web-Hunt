import React from 'react';
import { connect } from 'react-redux';
import { fetchProduct } from "../../../actions/products_actions";
import { createReview } from "../../../actions/review_actions";

const mstp = (state, ownProps) => {
  return {
    review: ownProps.review,
    profilePictureCurrentUser: state.session.currentUser.id ? state.entities.users[state.session.currentUser.id].profilePictureUrl : null
  };
}

const mdtp = dispatch => {
  return {
    createReview: review => dispatch(createReview(review)),
    fetchProduct: id => dispatch(fetchProduct(id))
  };
};


class ReviewInput extends React.Component {
  constructor(props) {
    super(props);
    const { product_id, reviewer_id, parent_review_id} = this.props.review;
    this.state = {
      body: '',
      parent_review_id,
      product_id,
      reviewer_id
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    let review = this.state;
    review[name] = value;
    this.setState({
      ...review
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const fetchProduct = this.props.fetchProduct;
    this.props.createReview(this.state).then(
      hi => fetchProduct(hi.review.product_id)
    );

    let review = this.state;
    review.body = '';
    this.setState({
      ...review
    });
  }

  render() {
    return ( 
      
      this.props.profilePictureCurrentUser ? (
        <>
          <img className="profile-picture-round" src={this.props.profilePictureCurrentUser} />
          <form onSubmit={this.handleSubmit}>
            {/* <section> */}
            <input onChange={this.handleChange} name="body" placeholder='enter a review' value={this.state.body} />
            {/* </section> */}
            <button>POST</button>
          </form>
        </>
      ) : (
          <p>Please log in to post a review.</p>
        )
      
     )
  }
}

export default connect(
  mstp,
  mdtp
)(ReviewInput);