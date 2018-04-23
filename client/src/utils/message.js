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

/**
 * @typedef {Object} Debug
 * @property {String} id
 * @property {String} message
 * @property {String} type
 */

/**
 * @param {String} id
 * @param {String} message
 * @param {String} type
 * @returns {Debug}
 */
export const createDebugMessage = (id, message, type) => ({
  id,
  message,
  type
})
