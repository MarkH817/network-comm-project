import React, { Component } from 'react'
import { Chat } from './components/chat'

export class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      log: []
    }
  }

  componentDidMount () {
    this.props.socket.on('chat-message', msg => {
      this.setState(prevState => ({
        log: [...prevState.log, msg]
      }))
    })
  }

  render () {
    return (
      <section>
        <Chat log={this.state.log} />
      </section>
    )
  }
}
