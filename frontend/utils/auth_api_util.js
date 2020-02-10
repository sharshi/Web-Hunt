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