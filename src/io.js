const socketIO = require('socket.io')

const { queueTask } = require('./utils')

/*
 * queueTask is used to ensure that changes to the
 * activeUsers variable are performed in order
 */

const attachIO = httpserver => {
  const io = socketIO(httpserver)

  let activeUsers = []

  io.on('connection', socket => {
    console.log(socket.id)

    queueTask().then(() => {
      // Add new user to activeUsers list
      activeUsers.push({ id: socket.id, username: 'guest' })

      // Send whole list of connected users to the new user only
      socket.emit('roster-current', activeUsers)
    })

    // Emit socketID to other users to update roster
    socket.broadcast.emit('roster-add', socket.id)

    // User broadcasts their username to others
    socket.on('username', (username = 'guest') => {
      // Updates username in activeUsers list
      queueTask().then(() => {
        activeUsers.forEach(user => {
          if (user.id === socket.id) {
            user.username = username
          }
        })
      })

      io.emit('username', {
        id: socket.id,
        username
      })
    })

    // User broadcasts their message
    socket.on('message', ({ message, timestamp }, ack) => {
      socket.broadcast.emit('message', {
        id: socket.id,
        message,
        timestamp
      })

      // Send confirmation of data received to sender
      ack()
    })

    // Emit disconnected socketID to all users
    socket.on('disconnect', () => {
      queueTask().then(() => {
        activeUsers = activeUsers.filter(({ id }) => id !== socket.id)
      })

      io.emit('roster-remove', socket.id)
    })

    // Peer functionality

    // Ask if user is available for P2P chat
    socket.on('peer-checkAvailability', peerId => {
      // Send asker's id for response
      socket.broadcast.to(peerId).emit('peer-availability', socket.id)
    })

    // Relay user availability to asker
    socket.on('peer-isAvailable', (peerId, isAvailable) => {
      socket.broadcast
        .to(peerId)
        .emit('peer-isAvailable', socket.id, isAvailable)
    })

    // Relay webRTC signal
    socket.on('peer-sendSignal', (peerId, signal) => {
      socket.broadcast.to(peerId).emit('peer-receiveSignal', signal)
    })
  })
}

module.exports = { attachIO }
