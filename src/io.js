const socketIO = require('socket.io')

const attachIO = httpserver => {
  const io = socketIO(httpserver)

  io.on('connection', socket => {
    console.log(`Connected:    ${socket.id}`)

    socket.on('message', (message, ack) => {
      socket.broadcast.emit('message', message)
      ack()
    })

    socket.on('disconnect', () => {
      console.log(`Disconnected: ${socket.id}`)
    })
  })
}

module.exports = { attachIO }
