import ProductForm from "./product_form";
import { connect } from "react-redux";
import { createProduct } from "../../../../actions/products_actions";

const mapStateToProps = state => ({
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
  }
})

const mapDispatchToProps = dispatch => ({
  createProduct: product => dispatch(createProduct(product))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductForm)