import FeedList from "./feed_list";
import { connect } from "react-redux";
import { fetchPopularProducts } from "../../../actions/products_actions";
import { openModal } from '../../../actions/modal_actions';

const mapStateToProps = state => {
  return ({
    products: state.entities.products,
    sort: state.entities.products[state.ui.feedSort],
    order: state.ui.feedSort,
    loggedIn: state.session.currentUser.id
})}

const mapDispatchToProps = dispatch => ({
  fetchPopularProducts: () => dispatch(fetchPopularProducts()),
  openModal: (modal, id) => dispatch(openModal(modal, id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedList)