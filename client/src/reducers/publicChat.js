import {
  createDebugMessage,
  messageComparator,
  sortedInsertion,
  createMessage
} from '../utils'

/**
 * @typedef {Object} PublicChat
 * @property {Boolean} connected
 * @property {Boolean} enabled
 * @property {Array<Message>} log
 * @property {Array<Debug>} debugLog
 */

/** @type {PublicChat} */
const DEFAULT_STATE = {
  connected: false,
  enabled: false,
  log: [],
  debugLog: []
}

/**
 * @param {PublicChat} state
 * @param {Object} action
 * @returns {PublicChat}
 */
export const publicChat = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'PUBLIC_CHAT_ADD_MESSAGE':
      return Object.assign({}, state, {
        log: sortedInsertion(
          state.log,
          createMessage(action.id, action.timestamp, action.message),
          messageComparator
        )
      })

    case 'PUBLIC_CHAT_ADD_INFO':
      return Object.assign({}, state, {
        debugLog: [
          ...state.debugLog,
          createDebugMessage(action.message, 'info')
        ]
      })

    case 'PUBLIC_CHAT_ADD_ERROR':
      return Object.assign({}, state, {
        debugLog: [
          ...state.debugLog,
          createDebugMessage(action.message, 'error')
        ]
      })

    case 'PUBLIC_CHAT_CONNECT':
      return Object.assign({}, state, { connected: true })

    case 'PUBLIC_CHAT_DISCONNECT':
      return Object.assign({}, state, { connected: false })

    case 'PUBLIC_CHAT_ENABLE':
      return Object.assign({}, state, { enabled: true })

    case 'PUBLIC_CHAT_DISABLE':
      return Object.assign({}, state, { enabled: false })

    default:
      return state
  }
}
