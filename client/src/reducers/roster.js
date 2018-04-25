/**
 * @typedef {Object} Roster
 * @property {Array<Object>} activeUsers
 * @property {String} selfId
 */

/** @type {Roster} */
const DEFAULT_STATE = {
  activeUsers: [],
  selfId: ''
}

/**
 * @param {Roster} state
 * @param {Object} action
 * @returns {Roster}
 */
export const roster = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'ROSTER_ID_SELF':
      return Object.assign({}, state, { selfId: action.id })

    case 'ROSTER_INIT':
      return Object.assign({}, state, {
        activeUsers: action.userList.map(user =>
          Object.assign({}, user, { isActive: true })
        )
      })

    case 'ROSTER_ADD_USER':
      return Object.assign({}, state, {
        activeUsers: [
          ...state.activeUsers,
          { id: action.id, username: 'guest', isActive: true }
        ]
      })

    case 'ROSTER_UPDATE_USERNAME':
      return Object.assign({}, state, {
        activeUsers: state.activeUsers.map(
          user =>
            action.id !== user.id
              ? user
              : Object.assign({}, user, { username: action.username })
        )
      })

    case 'ROSTER_REMOVE_USER':
      return Object.assign({}, state, {
        activeUsers: state.activeUsers.map(
          user =>
            action.id !== user.id
              ? user
              : Object.assign({}, user, { isActive: false })
        )
      })

    default:
      return state
  }
}
