import SessionForm from "./session_form";
import { connect } from "react-redux";
import { createUser } from "../../../actions/session_actions";

const mapStateToProps = state => ({
  formType: 'signup',
  desc: 'Sign Up',
  errors: state.errors.login
})

const mapDispatchToProps = dispatch => ({
  action: user => dispatch(createUser(user))
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm)