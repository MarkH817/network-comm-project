import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import '../styles/main.less'
import { PublicChat, Roster } from './components'
import { getStore } from './store'
import { connectSocketClient } from './utils'

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

const randomEntry = list => list[Math.floor(Math.random() * list.length)]

socket.on('connect', () => {
  socket.emit('username', randomEntry(guestNames))
})
// End of Demo Code

render(
  <Provider store={store}>
    <section className='app flex one two-800'>
      <section className='public'>
        <h3>Public Chat</h3>

        <PublicChat socket={socket} />
      </section>

      <section className='roster'>
        <h3>Roster</h3>

        <Roster />
      </section>

      {/* <section className='peer'>
        <h3>Peer Chat</h3>
      </section> */}
    </section>
  </Provider>,
  document.getElementById('root')
)
