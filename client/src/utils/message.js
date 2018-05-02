/**
 * @typedef {Object} Message
 * @property {String} id
 * @property {Number} timestamp
 * @property {String} message
 */

/**
 * @param {String} id
 * @param {Number} timestamp
 * @param {String} message
 * @returns {Message}
 */
export const createMessage = (id, timestamp, message) => ({
  id,
  timestamp,
  message
})

/**
 * Comparator used to sort message objects by timestamp
 * @type {Comparator}
 * @param {Message} a Message
 * @param {Number} a.timestamp
 * @param {Message} b Message
 * @param {Number} b.timestamp
 */
export const messageComparator = (a, b) => a.timestamp - b.timestamp

// istanbul ignore next
/**
 * @typedef {Object} Debug
 * @property {String} message
 * @property {String} type
 */

/**
 * @param {String} message
 * @param {String} type
 * @returns {Debug}
 */
export const createDebugMessage = (message, type) => ({
  message,
  type
})

/**
 * Get username by id
 * @param {Array<Object>} userlist
 * @param {String} id
 * @returns {String}
 */
export const getUsername = (userlist, id) => {
  const { username = 'guest', hash = 0 } =
    userlist.find(user => user.id === id) || {}

  return `${username}#${hash.toString().padStart(4, '0')}`
}
