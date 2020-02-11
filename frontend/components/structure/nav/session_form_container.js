import SessionForm from "./session_form";
import { connect } from "react-redux";
import { loginUser } from "../../../actions/session_actions";

const mapStateToProps = state => ({
  formType: 'login',
  desc: 'Log In'
})

const mapDispatchToProps = dispatch => ({
  action: user => dispatch(loginUser(user))
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm)