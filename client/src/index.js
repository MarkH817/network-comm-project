import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import '../styles/main.less'
import { App } from './app'
import { getStore } from './store'

const store = getStore()

store.subscribe(() => {
  console.log(store.getState())
})

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
