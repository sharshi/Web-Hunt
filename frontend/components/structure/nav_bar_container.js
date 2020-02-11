import NavBar from "./nav_bar";
import { connect } from "react-redux";
import { logoutUser} from "../../actions/session_actions";

const mapStateToProps = state => ({
  currentUser: state.session.currentUser
})

const mapDispatchToProps = dispatch => ({
  logout: user => dispatch(logoutUser(user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar)