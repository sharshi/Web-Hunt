import { getUsers, getUser, login, logout, signup, getUsername, updateUserUtil } from '../utils/auth_api_util'

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const RECEIVE_USER = 'RECEIVE_USER';
export const RECEIVE_USER_PROFILE = "RECEIVE_USER_PROFILE";
export const RECEIVE_USER_SIGNIN = "RECEIVE_USER_SIGNIN";
export const REMOVE_USER = 'REMOVE_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export const OPEN_MODAL = 'OPEN_MODAL';
export const RECEIVE_UPDATED_USER = 'RECEIVE_UPDATED_USER';

const receiveUsers = users => ({
  type: RECEIVE_USERS,
  users
})

const receiveUser = user => ({
  type: RECEIVE_USER,
  user
});

const receiveUserSignin = user => ({
  type: RECEIVE_USER_SIGNIN,
  user
});

const receiveUserProfile = user => {
  return({
  type: RECEIVE_USER_PROFILE,
  user
})}

const removeUser = userId => ({
  type: REMOVE_USER,
  userId
})

const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
})

export const clearErrors = () => ({
  type: CLEAR_ERRORS
})

export const openModal = modal => ({
  type: OPEN_MODAL,
  modal
});

export const receiveUpdatedUser = user => ({
  type: RECEIVE_UPDATED_USER,
  user
});

export const fetchUsers = () => dispatch => {
  getUsers().then(
      users => dispatch(receiveUsers(users)),
      errors => dispatch(receiveErrors(errors.responseJSON))
    )
}

export const fetchUser = id => dispatch => {
  return getUser(id).then(
    user => dispatch(receiveUser(user)),
    errors => dispatch(receiveErrors(errors.responseJSON))
  )
}

export const fetchUsername = username => dispatch => {
  getUsername(username).then(
    user => dispatch(receiveUserProfile(user)),
    errors => dispatch(receiveErrors(errors.responseJSON))
  )
}

export const createUser = user => dispatch => {
  signup(user).then(
    user => dispatch(receiveUserSignin(user)),
    errors => dispatch(receiveErrors(errors.responseJSON))
  );
}


export const updateUser = (user, id) => dispatch => {
 return updateUserUtil(user, id).then(
    user => {
      return dispatch(receiveUser(user))},
    errors => dispatch(receiveErrors(errors.responseJSON))
  )
}

export const loginUser = user => dispatch => {
  login(user).then(
    user => dispatch(receiveUserSignin(user)),
    errors => dispatch(receiveErrors(errors.responseJSON))
  );
}

export const logoutUser = user => dispatch => {
  logout(user).then(
    user => dispatch(removeUser(user.id)),
    errors => dispatch(receiveErrors(errors.responseJSON))
  )
}
