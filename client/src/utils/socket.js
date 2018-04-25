import io from 'socket.io-client'

import { publicChat, roster } from '../actions'

/**
 * Get instance of socket.io-client io
 * @returns {SocketIO} Promise that resolves to a client socket instance
 */
export const getSocket = () => {
  const URL =
    process.env.NODE_ENV === 'production'
      ? 'https://mark-p2p-chat.herokuapp.com/'
      : 'http://localhost:3000'

  return io(URL)
}

/**
 * Connect socket.io client events to the store
 * @param {Store} store
 * @returns {SocketIO}
 */
export const connectSocketClient = store => {
  const socket = getSocket()

  // Upon connection to socket server, get self id
  socket.on('connect', () => {
    store.dispatch(roster.idSelf(socket.id))
    store.dispatch(publicChat.connect())
    store.dispatch(publicChat.enableChat())
  })

  // Add each received message into the chat
  socket.on('message', ({ id, timestamp, message }) => {
    store.dispatch(publicChat.addMessage(id, timestamp, message))
  })

  // Update a user given their id with a username
  socket.on('username', ({ id, username }) => {
    store.dispatch(roster.updateUserName(id, username))
  })

  // Called once after connection
  // Initializes roster with the users already in the room
  socket.on('roster-current', userList => {
    store.dispatch(roster.initializeRoster(userList))
  })

  // Adds a new user to the roster
  socket.on('roster-add', id => {
    store.dispatch(roster.addUser(id))
  })

  // Removes a user when they disconnect
  socket.on('roster-remove', id => {
    store.dispatch(roster.removeUser(id))
  })

  // Log any errors
  socket.on('error', err => {
    console.error(err)

    store.dispatch(publicChat.addError('s', err.message))
  })

  return socket
}
