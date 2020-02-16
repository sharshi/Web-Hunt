import SessionForm from "./session_form";
import { connect } from "react-redux";
import { loginUser, clearErrors, openModal } from "../../../actions/session_actions";

const mapStateToProps = state => ({
  formType: 'login',
  desc: 'LOG IN',
  title: 'Log Into Webhunt',
  errors: state.errors.login
})

const mapDispatchToProps = dispatch => ({
  action: user => dispatch(loginUser(user)),
  loginUser: user => dispatch(loginUser(user)),
  clearErrors: () => dispatch(clearErrors()),
  openModal: modal => dispatch(openModal(modal))
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm)