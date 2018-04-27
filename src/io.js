const socketIO = require('socket.io')

const attachIO = httpserver => {
  const io = socketIO(httpserver)

  let activeUsers = []

  io.on('connection', socket => {
    console.log(socket.id)

    // Add new user to activeUsers list
    activeUsers = [...activeUsers, { id: socket.id, username: 'guest' }]

    // Send whole list of connected users to the new user only
    socket.emit('roster-current', activeUsers)

    // Emit socketID to other users to update roster
    socket.broadcast.emit('roster-add', socket.id)

    // User broadcasts their username to others
    socket.on('username', (username = 'guest') => {
      activeUsers = activeUsers.map(
        user => (user.id !== socket.id ? user : { id: socket.id, username })
      )

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
      io.emit('roster-remove', socket.id)

      activeUsers = activeUsers.filter(({ id }) => id !== socket.id)
    })
  })
}

module.exports = { attachIO }
