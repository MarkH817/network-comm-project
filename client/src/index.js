import React from 'react'
import { render } from 'react-dom'
import io from 'socket.io-client'
import { App } from './app'

render(<App />, document.getElementById('root'))

const URL =
  process.env.NODE_ENV === 'production'
    ? undefined
    : 'localhost:3000'

const socket = io(URL)

socket.on('chat-message', console.log)

socket.emit('greet', 'hello!')
