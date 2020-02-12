import FeedList from "./feed_list";
import { connect } from "react-redux";
import { fetchPopularProducts, fetchNewestProducts } from "../../../actions/products_actions";

const mapStateToProps = state => ({
  hi: 'hi'
})

const mapDispatchToProps = dispatch => ({
  fetchPopularProducts: () => dispatch(fetchPopularProducts()),
  fetchNewestProducts: () => dispatch(fetchNewestProducts())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedList)