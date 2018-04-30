/**
 * Add socketID of self
 * @param {String} socketID
 */
export const idSelf = socketID => ({
  type: 'ROSTER_ID_SELF',
  id: socketID
})

/**
 * Initialize roster w/ current active users
 * @param {Array<Object>} userList
 */
export const initializeRoster = userList => ({
  type: 'ROSTER_INIT',
  userList
})

/**
 * Add new user to roster
 * @param {String} socketID
 */
export const addUser = socketID => ({
  type: 'ROSTER_ADD_USER',
  id: socketID
})

/**
 * Attaches a username to the socketID
 * @param {String} socketID
 * @param {String} username
 */
export const updateUserName = (socketID, username) => ({
  type: 'ROSTER_UPDATE_USERNAME',
  id: socketID,
  username
})

/**
 * Remove disconnected user
 * @param {String} socketID
 */
export const inactiveUser = socketID => ({
  type: 'ROSTER_INACTIVE_USER',
  id: socketID
})
