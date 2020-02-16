import { connect } from 'react-redux';
import { closeModal } from '../../../actions/modal_actions';
import { fetchProduct } from '../../../actions/products_actions';
import Product from './product';

const mapStateToProps = (state) => {
  const idFromHash = location.hash.split('products/')[1];
  let productId = idFromHash ? idFromHash : state.ui.modal[1];

  return ({
    product: state.entities.products[productId],
    productId,
    inModal: state.ui.modal.length > 0
})}

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal()),
  fetchProduct: productId => dispatch(fetchProduct(productId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product);
