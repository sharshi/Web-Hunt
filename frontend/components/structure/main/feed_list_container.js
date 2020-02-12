import FeedList from "./feed_list";
import { connect } from "react-redux";
import { fetchPopularProducts, fetchRecentProducts } from "../../../actions/products_actions";

const mapStateToProps = state => ({
  hi: 'hi'
})

const mapDispatchToProps = dispatch => ({
  fetchPopularProducts: () => dispatch(fetchPopularProducts()),
  fetchRecentProducts: () => dispatch(fetchRecentProducts())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedList)