/**
 * @typedef {Object} Roster
 * @property {Array<User>} activeUsers
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
      return Object.assign({}, state, { selfID: action.id })

    case 'ROSTER_INIT':
      return Object.assign({}, state, { activeUsers: action.userList })

    case 'ROSTER_ADD_USER':
      return Object.assign({}, state, {
        activeUsers: [
          ...state.activeUsers,
          { id: action.id, username: 'guest' }
        ]
      })

    case 'ROSTER_UPDATE_USERNAME':
      return Object.assign({}, state, {
        activeUsers: state.activeUsers.map(
          user =>
            action.id !== user.id
              ? user
              : { id: user.id, username: action.username }
        )
      })

    case 'ROSTER_REMOVE_USER':
      return Object.assign({}, state, {
        activeUsers: state.activeUsers.filter(({ id }) => id !== action.id)
      })

    default:
      return state
  }
}
