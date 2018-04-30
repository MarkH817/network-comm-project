import { hashCode } from '../utils'

/**
 * @typedef {Object} Roster
 * @property {Array<Object>} users
 * @property {String} selfId
 */

/** @type {Roster} */
const DEFAULT_STATE = {
  users: [],
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
        users: action.userList.map(user =>
          Object.assign({}, user, {
            hash: hashCode(user.id) % 10000,
            isActive: true
          })
        )
      })

    case 'ROSTER_ADD_USER':
      return Object.assign({}, state, {
        users: [
          ...state.users,
          {
            id: action.id,
            username: 'guest',
            hash: hashCode(action.id) % 10000,
            isActive: true
          }
        ]
      })

    case 'ROSTER_UPDATE_USERNAME':
      return Object.assign({}, state, {
        users: state.users.map(
          user =>
            action.id !== user.id
              ? user
              : Object.assign({}, user, { username: action.username })
        )
      })

    case 'ROSTER_INACTIVE_USER':
      return Object.assign({}, state, {
        users: state.users.map(
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
