import { connect } from 'react-redux';
import Profile from './profile';
import { fetchUsername, clearErrors } from "../../../actions/session_actions";
import { openModal } from '../../../actions/modal_actions';
import { deleteProduct } from '../../../actions/products_actions';
import { withRouter } from 'react-router-dom';


const mapStateToProps = (state, ownProps) => {
  const username = ownProps.url.split('/')[0];
  return ({
    username: username,
    profileNotFound: state.errors.login.length > 0,
    user: state.ui.profileUser,
    errors: state.errors.login,
    currentUser: state.session.currentUser.username,
    currentUserId: state.session.currentUser.id
  })
}

const mapDispatchToProps = dispatch => ({
  fetchUsername: username => dispatch(fetchUsername(username)),
  deleteProduct: id => dispatch(deleteProduct(id)),
  clearErrors: () => dispatch(clearErrors()),
  openModal: (modal, id) => dispatch(openModal(modal, id))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Profile)
);