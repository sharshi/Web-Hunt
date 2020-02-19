import { connect } from 'react-redux';
import ProfileForm from './profile_form';
import { fetchUsername, clearErrors, updateUser  } from "../../../actions/session_actions";

const mapStateToProps = (state, ownProps) => {
  return ({
    username: ownProps.url,
    profileNotFound: state.errors.login.length > 0,
    user: state.entities.users[state.session.currentUser.id],
    errors: state.errors.login,
    currentUser: state.session.currentUser.username
  })
}

const mapDispatchToProps = dispatch => ({
  fetchUsername: username => dispatch(fetchUsername(username)),
  clearErrors: () => dispatch(clearErrors()),
  updateUser: (user, id) => dispatch(updateUser(user, id)) 
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileForm);