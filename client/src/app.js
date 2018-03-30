import React from 'react'
import { Chat } from './components/chat'

export const App = () => (
  <section>
    <Chat log={[{
      timestamp: Date.now(),
      text: 'hello',
      username: 'lionbyte'
    }]} />
  </section>
)
