const Debug = require('debug')
const http = require('http')

const { app } = require('./app')
const { attachIO } = require('./io')

const normalizePort = (val = '3000') => {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

const onError = error => {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`)
      process.exit(1)
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`)
      process.exit(1)
    default:
      throw error
  }
}

const onListening = () => {
  const addr = server.address()
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port

  debug(`Listening on ${bind}`)
}

const debug = Debug('test:server')
const port = normalizePort(process.env.PORT)
app.set('port', port)

const server = http.createServer(app)
server.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

attachIO(server)

server.on('error', onError)
server.on('listening', onListening)
