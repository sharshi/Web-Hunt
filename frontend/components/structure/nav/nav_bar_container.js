import NavBar from "./nav_bar";
import { connect } from "react-redux";
import { logoutUser, openModal } from "../../../actions/session_actions";
import { openUserMenu, closeUserMenu } from "../../../actions/navbar_actions";

const mapStateToProps = state => {
  
  const pic = state.session.currentUser.id ? state.entities.users[state.session.currentUser.id].profilePictureUrl : null;
  
  return {
    currentUserId: state.session.currentUser.id,
    currentUserName: state.session.currentUser.username,
    profilePictureUrl: pic,
    userMenuStatus: state.ui.navBar === "opened"
  };}

const mapDispatchToProps = dispatch => ({
  logout: user => dispatch(logoutUser(user)),
  openModal: type => dispatch(openModal(type)),
  openUserMenu: () => dispatch(openUserMenu()),
  closeUserMenu: () => dispatch(closeUserMenu())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar)