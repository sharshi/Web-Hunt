import ProductForm from "./product_form";
import { connect } from "react-redux";
import { updateProduct } from "../../../../actions/products_actions";
import {  clearErrors } from "../../../../actions/session_actions";

const mapStateToProps = (state, ownprops) => {
  //checkownprops for which product is being updated
  debugger
  return({
    product: state.entities.products[ownprops.id],
    errors: state.errors.product
  });
}

const mapDispatchToProps = dispatch => ({
  updateProduct: product => dispatch(updateProduct(product)),
  clearErrors: () => dispatch(clearErrors()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductForm)