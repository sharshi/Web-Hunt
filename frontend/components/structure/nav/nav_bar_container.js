import NavBar from "./nav_bar";
import { connect } from "react-redux";
import { logoutUser, openModal } from "../../../actions/session_actions";

const mapStateToProps = state => ({
  currentUserId: state.session.currentUser.id,
  currentUserName: state.session.currentUser.username
})

const mapDispatchToProps = dispatch => ({
  logout: user => dispatch(logoutUser(user)),
  openModal: type => dispatch(openModal(type))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar)