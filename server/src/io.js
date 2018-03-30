const socketIO = require('socket.io')

const attachIO = httpserver => {
  const io = socketIO(httpserver)

  io.on('connection', socket => {
    console.log(`Connected to a user ${socket.id}`)
    io.emit('chat-message', `Hewwo ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`User ${socket.id} disconnected\n`)
    })

    socket.on('greet', data => {
      console.log(`User ${socket.id} greets: ${data}`)
    })
  })
}

module.exports = { attachIO }
