// istanbul ignore next
/**
 * Get instance of simple-peer Peer
 * @param {Boolean} isInitiator Indicates that this peer is initiating the connection
 * @returns {PromiseLike<Peer>} A Peer instance
 */
export const getPeer = isInitiator => {
  return new Promise((resolve, reject) => {
    import(/* webpackPrefetch: true */ 'simple-peer')
      .then(({ default: Peer }) => {
        const peer = new Peer({
          initiator: isInitiator,
          trickle: false
        })

        resolve(peer)
      })
      .catch(reject)
  })
}
