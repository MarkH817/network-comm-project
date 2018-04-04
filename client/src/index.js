import React from 'react'
import { render } from 'react-dom'
import io from 'socket.io-client'
import moment from 'moment'

import '../styles/main.less'

const URL = process.env.NODE_ENV === 'production' ? undefined : 'localhost:3000'

const socket = io(URL)

import('./app').then(({ App }) => {
  render(<App socket={socket} />, document.getElementById('root'))
})

socket.on('chat-message', ({ timestamp, message }) => {
  console.log(`[${timestamp}] ${message}`)
})

socket.emit('greet', {
  timestamp: moment.utc().unix(),
  message: 'hello!'
})
