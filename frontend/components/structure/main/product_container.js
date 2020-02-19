import { connect } from 'react-redux';
import { closeModal } from '../../../actions/modal_actions';
import { fetchProduct } from '../../../actions/products_actions';
import Product from './product';

const mapStateToProps = (state, ownProps) => {
  debugger
  const stringFromHash = location.hash.split('products/')[1];
  const idFromHash = stringFromHash ? stringFromHash.split('?')[0] : stringFromHash;
  let productId = idFromHash ? idFromHash : state.ui.modal[1];
  return ({
    product: state.entities.products[productId],
    productId,
    inModal: ownProps.fromModal
})}

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal()),
  fetchProduct: productId => dispatch(fetchProduct(productId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product);
