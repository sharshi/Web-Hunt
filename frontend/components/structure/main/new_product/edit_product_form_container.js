import EditProduct from "./edit_product";
import { connect } from "react-redux";
import { fetchProduct, updateProduct } from "../../../../actions/products_actions";
import {  clearErrors } from "../../../../actions/session_actions";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state, op) => {
  return({
    product: state.entities.products[op.match.params.id],
    errors: state.errors.product
  });
}

const mapDispatchToProps = dispatch => ({
  updateProduct: product => dispatch(updateProduct(product)),
  fetchProduct: id => dispatch(fetchProduct(id)),
  clearErrors: () => dispatch(clearErrors()),
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditProduct)
);