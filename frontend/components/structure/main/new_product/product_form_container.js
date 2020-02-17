import ProductForm from "./product_form";
import { connect } from "react-redux";
import { createProduct } from "../../../../actions/products_actions";
import {  clearErrors } from "../../../../actions/session_actions";

const mapStateToProps = state => {
  return({
  product: {
    website: '',
    title: '',
    tagline: '',
    topics: [],
    logo: '',
    status: true,
    screenshots: [],
    youtube: '',
    description: '',
    twitter: '',
    //review: '',
    hunter_id: state.session.currentUser.id
  },
  errors: state.errors.product
})}

const mapDispatchToProps = dispatch => ({
  createProduct: product => dispatch(createProduct(product)),
  clearErrors: () => dispatch(clearErrors()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductForm)