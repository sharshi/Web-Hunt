import { connect } from 'react-redux';
import { closeModal } from '../../../actions/modal_actions';
import { fetchProduct } from '../../../actions/products_actions';
import Product from './product';

const mapStateToProps = (state, ownProps) => {
  const productId = location.hash.split('products/')[1];
  return ({
    product: state.entities.products[productId],
    productId,
    inModal: state.ui.modal
})}

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal()),
  fetchProduct: productId => dispatch(fetchProduct(productId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product);
