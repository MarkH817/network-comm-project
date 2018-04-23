/**
 * Get instance of socket.io-client io
 * @returns {Promise} Promise that resolves to a client socket instance
 */
export const getSocket = () => {
  const URL =
    process.env.NODE_ENV === 'production'
      ? 'https://mark-p2p-chat.herokuapp.com/'
      : 'http://localhost:3000'

  return new Promise((resolve, reject) => {
    import('socket.io-client')
      .then(({ default: io }) => {
        resolve(io(URL))
      })
      .catch(reject)
  })
}

/**
 * Get instance of simple-peer Peer
 * @param {Boolean} isInitiator Indicates that this peer is initiating the connection
 * @returns {Promise} Promise that resolves to a Peer instance
 */
export const getPeer = isInitiator => {
  return new Promise((resolve, reject) => {
    import('simple-peer')
      .then(({ default: Peer }) => {
        resolve(
          new Peer({
            initiator: isInitiator,
            trickle: false
          })
        )
      })
      .catch(reject)
  })
}

export { sortedInsertion } from './list'
export { createDebugMessage, createMessage, messageComparator } from './message'
