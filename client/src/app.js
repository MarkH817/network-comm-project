import React from 'react'
import { PeerChat } from './components/peerChat'
import { PublicChat } from './components/publicChat'

export const App = () => (
  <section className='app flex one two-800'>
    <PublicChat />
    <PeerChat />
  </section>
)
