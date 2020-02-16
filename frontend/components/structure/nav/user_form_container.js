import SessionForm from "./session_form";
import { connect } from "react-redux";
import { createUser, loginUser, clearErrors, openModal } from "../../../actions/session_actions";

const mapStateToProps = state => ({
  formType: 'signup',
  desc: 'SIGN UP',
  title: 'Sign up on Web Hunt',
  errors: state.errors.login
})

const mapDispatchToProps = dispatch => ({
  action: user => dispatch(createUser(user)),
  loginUser: user => dispatch(loginUser(user)),
  clearErrors: () => dispatch(clearErrors()),
  openModal: modal => dispatch(openModal(modal))
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm)