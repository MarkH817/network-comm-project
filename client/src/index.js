import React from 'react'
import { render } from 'react-dom'

import '../styles/main.less'

const URL = process.env.NODE_ENV === 'production' ? undefined : 'localhost:3000'

console.log(URL)

import('./app').then(({ App }) => {
  render(<App />, document.getElementById('root'))
})
