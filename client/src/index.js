import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import Loadable from 'react-loadable'
import { Provider } from 'react-redux'

import '../styles/main.less'
import { Loading } from './components/loading'
import { getStore } from './store'
import { getSocket } from './utils'

const store = getStore()

const Roster = Loadable({
  loader: () => import('./components/roster'),
  loading: Loading
})

const PublicChat = Loadable({
  loader: () => import('./components/publicChat'),
  loading: Loading
})

const PeerChat = Loadable({
  loader: () => import('./components/peerChat'),
  loading: Loading
})

const socket = getSocket()

render(
  <Provider store={store}>
    <section className='app flex one two-1000'>
      <PublicChat socketPromise={socket} className='public' />

      <Roster socketPromise={socket} className='roster' />

      <PeerChat socketPromise={socket} className='peer' />
    </section>
  </Provider>,
  document.getElementById('root')
)
