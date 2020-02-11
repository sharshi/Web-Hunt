import { getUsers, getUser, signup } from '../utils/auth_api_util'
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const RECEIVE_USER = 'RECEIVE_USER';

const receiveUsers = users => ({
  type: RECEIVE_USERS,
  users
})

const receiveUser = user => ({
  type: RECEIVE_USER,
  user
})

export const fetchUsers = () => dispatch => {
  getUsers().then(users => dispatch(receiveUsers(users)))
}

export const fetchUser = id => dispatch => {
  getUser(id).then(user => dispatch(receiveUser(user)))
}

export const createUser = user => dispatch => {
  signup(user).then(user => dispatch(receiveUser(user)))
}