const socketIO = require('socket.io')

const attachIO = httpserver => {
  const io = socketIO(httpserver)

  io.on('connection', socket => {
    console.log(`Connected:    ${socket.id}`)

    socket.on('message', (message, cb) => {
      console.log(`Message: ${JSON.stringify(message)}`)
      socket.broadcast.emit('message', message)
      cb()
    })

    socket.on('disconnect', () => {
      console.log(`Disconnected: ${socket.id}`)
    })
  })
}

module.exports = { attachIO }
