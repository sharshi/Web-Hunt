import { connect } from 'react-redux';
import { closeModal } from '../../../actions/modal_actions';
import Product from './product';

const mapStateToProps = state => {
  const id = location.hash.split('products/')[1];
  return ({
    product: state.entities.products[id]
})}

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product);
