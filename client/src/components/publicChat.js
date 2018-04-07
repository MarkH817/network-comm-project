import React, { Component } from 'react'
import io from 'socket.io-client'
import { Chat } from './chat'

const URL =
  process.env.NODE_ENV === 'production'
    ? 'https://mark-p2p-chat.herokuapp.com/'
    : 'http://localhost:3000'

export class PublicChat extends Component {
  constructor (props) {
    super(props)

    this.state = {
      log: []
    }

    this.socket = null
  }

  componentDidMount () {
    const socket = io(URL)

    socket.on('')

    this.socket = socket
  }

  componentWillUnmount () {
    const { socket } = this

    if (socket !== null) {
      socket.close()
    }
  }

  addMessage (message) {
    this.setState(prevState => ({
      log: [...prevState.log, message]
    }))
  }

  render () {
    const { log } = this.state

    return (
      <section className='public'>
        <h3>PUBC</h3>

        <Chat log={log} />
      </section>
    )
  }
}
