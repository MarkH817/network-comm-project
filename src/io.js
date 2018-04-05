const socketIO = require('socket.io')
const moment = require('moment')

const attachIO = httpserver => {
  const io = socketIO(httpserver)

  io.on('connection', socket => {
    console.log(`Connected to a user ${socket.id}`)

    io.emit('chat-message', {
      timestamp: moment.utc().unix(),
      message: `Hewwo ${socket.id}`
    })

    socket.on('disconnect', () => {
      console.log(`User ${socket.id} disconnected\n`)
    })

    socket.on('greet', ({ timestamp, message }) => {
      console.log(`[${timestamp}] User ${socket.id} greets: ${message}`)
    })
  })
}

module.exports = { attachIO }
