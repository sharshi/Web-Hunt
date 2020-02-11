import { getUsers, getUser, login, logout, signup } from '../utils/auth_api_util'

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const RECEIVE_USER = 'RECEIVE_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';

const receiveUsers = users => ({
  type: RECEIVE_USERS,
  users
})

const receiveUser = user => ({
  type: RECEIVE_USER,
  user
})

const removeUser = userId => ({
  type: REMOVE_USER,
  userId
})

const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
})


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
