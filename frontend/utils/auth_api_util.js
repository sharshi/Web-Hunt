// AustApiUtil
/** 
 * #getUsers
 * returns all users
 */
export const getUsers = () => (
  $.ajax({
    url: 'api/users'
  })
)

/**
 * #getUser:id
 * returns users by id
 */
export const getUser = id => (
  $.ajax({
    url: `api/users/${id}`
  })
)

/**
 * #signup:user
 * signs up and returns user
 */
export const signup = user => (
  $.ajax({
    method: 'post',
    url: `api/users/`,
    data: { user }
  })
)

/**
 * #login:user
 * logs in and returns user
 */
export const login = user => (
  $.ajax({
    method: 'post',
    url: `api/session/`,
    data: { user }
  })
)

/**
 * #logout
 * logs user out
 */
export const logout = () => (
  $.ajax({
    method: 'delete',
    url: `api/session/`
  })
)

/**
 * #getUser:username
 * returns users by username
 */
export const getUsername = username => (
  $.ajax({
    url: `api/username/${username}`
  })
)