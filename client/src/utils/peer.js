import Peer from 'simple-peer'

/**
 * Get instance of simple-peer Peer
 * @param {Boolean} isInitiator Indicates that this peer is initiating the connection
 * @returns {Peer} A Peer instance
 */
export const getPeer = isInitiator => {
  return new Peer({
    initiator: isInitiator,
    trickle: false
  })
}
