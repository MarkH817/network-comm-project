import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import Loadable from 'react-loadable'
import { Provider } from 'react-redux'

import '../styles/main.less'
import { Loading } from './components/loading'
import { getStore } from './store'

const store = getStore()

const Roster = Loadable({
  loader: () => import('./components/roster'),
  loading: Loading
})

const PublicChat = Loadable({
  loader: () => import('./components/publicChat'),
  loading: Loading
})

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
    </section>
  </Provider>,
  document.getElementById('root')
)
