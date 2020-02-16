import Feed from "./feed";
import { connect } from "react-redux";
import { sortFeed } from "../../../actions/feed_actions";

// const mapStateToProps = state => {
//   return ({
//   })
// }

const mapDispatchToProps = dispatch => ({
  sortFeed: order => dispatch(sortFeed(order))
})

export default connect(
  null,
  mapDispatchToProps
)(Feed)