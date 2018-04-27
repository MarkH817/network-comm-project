/**
 * Get instance of socket.io-client io
 * @returns {PromiseLike<SocketIO>} Promise that resolves to a client socket instance
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
