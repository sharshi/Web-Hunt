import { connect } from 'react-redux';
import { closeModal, openModal } from '../../../actions/modal_actions';
import { fetchProduct } from "../../../actions/products_actions";
import * as V from "../../../actions/vote_actions";
import Product from './product';

const mapStateToProps = (state, ownProps) => {
  const stringFromHash = location.hash.split('products/')[1];
  const idFromHash = stringFromHash ? stringFromHash.split('?')[0] : stringFromHash;
  let productId = idFromHash ? idFromHash : state.ui.modal[1];
  return {
    product: state.entities.products[productId],
    productId,
    inModal: ownProps.fromModal,
    loggedIn: state.session.currentUser.id,
    reviews: state.entities.reviews,
    profilePictureCurrentUser: state.session.currentUser.profilePictureUrl
  };}

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal()),
  openModal: type => dispatch(openModal(type)),
  fetchProduct: productId => dispatch(fetchProduct(productId)),
  vote: vote => dispatch(V.vote(vote)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product);
