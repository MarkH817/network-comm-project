import React from 'react'
import { render } from 'react-dom'

import '../styles/main.less'

import('./app').then(({ App }) => {
  render(<App />, document.getElementById('root'))
})
