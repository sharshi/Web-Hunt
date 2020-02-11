import { getUser, login, logout } from '../utils/auth_api_util'
export const RECEIVE_USER = 'RECEIVE_USER';
export const REMOVE_USER = 'REMOVE_USER';


const receiveUser = user => ({
  type: RECEIVE_USER,
  user
})
const removeUser = userId => ({
  type: REMOVE_USER,
  userId
})

export const fetchUser = id => dispatch => {
  getUser(id).then(user => dispatch(receiveUser(user)))
}

export const loginUser = user => dispatch => {
  login(user).then(user => dispatch(receiveUser(user)))
}

export const logoutUser = user => dispatch => {
  logout(user).then(user => dispatch(removeUser(user.id)))
}