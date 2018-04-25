import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import '../styles/main.less'
import { PublicChat, Roster } from './components'
import { getStore } from './store'
import { connectSocketClient } from './utils'
import { addMessage, disableChat, enableChat } from './actions/publicChat'

const store = getStore()
const socket = connectSocketClient(store)

// Demo code
const guestNames = [
  'Mark',
  'Christo',
  'Sam',
  'Jill',
  'Justin',
  'Cristy',
  'Derek',
  'Kat',
  'Matt',
  'Dorian',
  'Reinhardt',
  'Nathan'
]

const guestMessages = [
  'Hi!',
  'Hey there!',
  'Take it sleazy',
  'Is that Matt Doyle',
  'Cursed',
  'Do not.',
  ':3c',
  'Oh, worm?',
  'Bet',
  'H',
  'Wh-',
  'What?',
  `I don't know what you mean.`,
  '>:3'
]

const randomEntry = list => list[Math.floor(Math.random() * list.length)]

socket.on('connect', () => {
  socket.emit('username', randomEntry(guestNames))

  const { id } = socket

  setInterval(() => {
    store.dispatch(disableChat())
    const message = randomEntry(guestMessages)

    import('moment')
      .then(({ default: { utc } }) => {
        const timestamp = utc().valueOf()

        socket.emit(
          'message',
          {
            message,
            timestamp
          },
          () => {
            store.dispatch(addMessage(id, timestamp, message))
            store.dispatch(enableChat())
          }
        )
      })
      .catch(console.error)
  }, 10000)
})
// End of Demo Code

render(
  <Provider store={store}>
    <section className='app flex one two-800'>
      <section className='public'>
        <h3>Public Chat</h3>

        <PublicChat />
      </section>

      <section className='roster'>
        <h3>Roster</h3>

        <Roster />
      </section>

      <section className='peer'>
        <h3>Peer Chat</h3>
      </section>
    </section>
  </Provider>,
  document.getElementById('root')
)
