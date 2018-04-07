import React from 'react'
import { PeerChat } from './components/peerChat'
import { PublicChat } from './components/publicChat'

export const App = () => (
  <section className='app flex one two-500'>
    <PublicChat />
    <PeerChat />
  </section>
)
