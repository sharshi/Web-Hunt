import SessionForm from "./session_form";
import { connect } from "react-redux";
import { createUser, loginUser } from "../../../actions/session_actions";

const mapStateToProps = state => ({
  formType: 'signup',
  desc: 'Sign Up',
  title: 'Sign up on Web Hunt',
  errors: state.errors.login
})

const mapDispatchToProps = dispatch => ({
  action: user => dispatch(createUser(user)),
  loginUser: user => dispatch(loginUser(user))
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm)