import FeedList from "./feed_list";
import { connect } from "react-redux";
import { fetchPopularProducts } from "../../../actions/products_actions";
import { openModal } from '../../../actions/modal_actions';

const mapStateToProps = state => ({
  products: Object.keys(state.entities.products)
    .map(key => state.entities.products[key])
})

const mapDispatchToProps = dispatch => ({
  fetchPopularProducts: () => dispatch(fetchPopularProducts()),
  openModal: id => dispatch(openModal('product', id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedList)