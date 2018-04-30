import {
  createDebugMessage,
  messageComparator,
  sortedInsertion,
  createMessage
} from '../utils'

/**
 * @typedef {Object} PeerChat
 * @property {Boolean} connected
 * @property {Boolean} enabled
 * @property {String} peerId
 * @property {Array<Message>} log
 * @property {Array<Debug>} debugLog
 */

/** @type {PeerChat} */
const DEFAULT_STATE = {
  connected: false,
  enabled: false,
  peerId: '',
  log: [],
  debugLog: []
}

/**
 * @param {PeerChat} state
 * @param {Object} action
 * @returns {PeerChat}
 */
export const peerChat = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'PEER_CHAT_ADD_MESSAGE':
      return Object.assign({}, state, {
        log: sortedInsertion(
          state.log,
          createMessage(action.id, action.timestamp, action.message),
          messageComparator
        )
      })

    case 'PEER_CHAT_ADD_INFO':
      return Object.assign({}, state, {
        debugLog: [
          ...state.debugLog,
          createDebugMessage(action.message, 'info')
        ]
      })

    case 'PEER_CHAT_ADD_ERROR':
      return Object.assign({}, state, {
        debugLog: [
          ...state.debugLog,
          createDebugMessage(action.message, 'error')
        ]
      })

    case 'PEER_CHAT_CONNECT':
      return Object.assign({}, state, {
        connected: true,
        peerId: action.peerId
      })

    case 'PEER_CHAT_DISCONNECT':
      return Object.assign({}, state, { connected: false })

    case 'PEER_CHAT_ENABLE':
      return Object.assign({}, state, { enabled: true })

    case 'PEER_CHAT_DISABLE':
      return Object.assign({}, state, { enabled: false })

    default:
      return state
  }
}
