/**
 * Add message to public chat log
 * @param {String} peerId
 * @param {Number} timestamp
 * @param {String} message
 */
export const addMessage = (peerId, timestamp, message) => ({
  type: 'PEER_CHAT_ADD_MESSAGE',
  id: peerId,
  timestamp,
  message: message.trim()
})

/**
 * Add verbose info messages
 * @param {String} message
 */
export const addInfo = message => ({
  type: 'PEER_CHAT_ADD_INFO',
  message
})

/**
 * Add error messages
 * @param {String} message
 */
export const addError = message => ({
  type: 'PEER_CHAT_ADD_ERROR',
  message
})

/**
 * Connect to peer
 * @param {String} socketId
 * @param {String} peerId
 */
export const connectPeer = (socketId, peerId) => ({
  type: 'PEER_CHAT_CONNECT',
  id: socketId,
  peerId
})

/**
 * Disconnect peer
 */
export const disconnectPeer = () => ({
  type: 'PEER_CHAT_DISCONNECT'
})

/**
 * Enable chat functionality
 */
export const enableChat = () => ({
  type: 'PEER_CHAT_ENABLE'
})

/**
 * Disable chat functionality
 */
export const disableChat = () => ({
  type: 'PEER_CHAT_DISABLE'
})
