import FeedList from "./feed_list";
import { connect } from "react-redux";
import { fetchPopularProducts } from "../../../actions/products_actions";

const mapStateToProps = state => ({
  products: Object.keys(state.entities.products)
    .map(key => state.entities.products[key])
})

const mapDispatchToProps = dispatch => ({
  fetchPopularProducts: () => dispatch(fetchPopularProducts())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedList)