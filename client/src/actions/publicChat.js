/**
 * Add message to public chat log
 * @param {String} socketId
 * @param {Number} timestamp
 * @param {String} message
 */
export const addMessage = (socketId, timestamp, message) => ({
  type: 'PUBLIC_CHAT_ADD_MESSAGE',
  id: socketId,
  timestamp,
  message: message.trim()
})

/**
 * Add verbose info messages
 * @param {String} id
 * @param {String} message
 */
export const addInfo = (id, message) => ({
  type: 'PUBLIC_CHAT_ADD_INFO',
  id,
  message
})

/**
 * Add error messages
 * @param {String} id
 * @param {String} message
 */
export const addError = (id, message) => ({
  type: 'PUBLIC_CHAT_ADD_ERROR',
  id,
  message
})

export const connect = () => ({
  type: 'PUBLIC_CHAT_CONNECT'
})

export const disconnect = () => ({
  type: 'PUBLIC_CHAT_DISCONNECT'
})

/**
 * Enable chat functionality
 */
export const enableChat = () => ({
  type: 'PUBLIC_CHAT_ENABLE'
})

/**
 * Disable chat functionality
 */
export const disableChat = () => ({
  type: 'PUBLIC_CHAT_DISABLE'
})
