const socketIO = require('socket.io')

const attachIO = httpserver => {
  const io = socketIO(httpserver)

  let activeUsers = []

  io.on('connection', socket => {
    // Add new user to activeUsers list
    activeUsers = [...activeUsers, { id: socket.id, username: 'guest' }]

    // Send whole list of connected users to the new user only
    socket.emit('roster-current', activeUsers)

    // Emit socketID to all users to update roster
    socket.broadcast.emit('roster-add', socket.id)

    // Send username to all users for this id
    socket.on('username', (username = 'guest') => {
      activeUsers = activeUsers.map(
        user => (user.id !== socket.id ? user : { id: socket.id, username })
      )

      io.emit('username', {
        id: socket.id,
        username
      })
    })

    socket.on('message', (message, ack) => {
      socket.broadcast.emit('message', message)
      ack()
    })

    // Emit disconnected socketID to all users
    socket.on('disconnect', () => {
      io.emit('roster-remove', socket.id)
    })
  })
}

module.exports = { attachIO }
