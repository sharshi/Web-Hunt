import { connect } from 'react-redux';
import Profile from './profile';
import { fetchUsername, clearErrors } from "../../../actions/session_actions";

const mapStateToProps = (state, ownProps) => {
  return ({
    username: ownProps.url,
    profileNotFound: state.errors.login.length > 0,
    user: state.ui.profileUser,
    errors: state.errors.login
  })
}

const mapDispatchToProps = dispatch => ({
  fetchUsername: username => dispatch(fetchUsername(username)),
  clearErrors: () => dispatch(clearErrors())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);