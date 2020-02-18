import { getUsers, getUser, login, logout, signup, getUsername } from '../utils/auth_api_util'

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const RECEIVE_USER = 'RECEIVE_USER';
export const RECEIVE_USER_PROFILE = 'RECEIVE_USER_PROFILE';
export const REMOVE_USER = 'REMOVE_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export const OPEN_MODAL = 'OPEN_MODAL';

const receiveUsers = users => ({
  type: RECEIVE_USERS,
  users
})

const receiveUser = user => ({
  type: RECEIVE_USER,
  user
})

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

export const fetchUsers = () => dispatch => {
  getUsers().then(
      users => dispatch(receiveUsers(users)),
      errors => dispatch(receiveErrors(errors.responseJSON))
    )
}

export const fetchUser = id => dispatch => {
  getUser(id).then(
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
    user => dispatch(receiveUser(user)),
    errors => dispatch(receiveErrors(errors.responseJSON))
  )
}

export const loginUser = user => dispatch => {
  login(user).then(
    user => dispatch(receiveUser(user)),
    errors => dispatch(receiveErrors(errors.responseJSON))
  )
}

export const logoutUser = user => dispatch => {
  logout(user).then(
    user => dispatch(removeUser(user.id)),
    errors => dispatch(receiveErrors(errors.responseJSON))
  )
}
