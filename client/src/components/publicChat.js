import React, { Component, Fragment } from 'react'
import moment from 'moment'

import { Chat } from './chat'

const URL =
  process.env.NODE_ENV === 'production'
    ? 'https://mark-p2p-chat.herokuapp.com/'
    : 'http://localhost:3000'

export class PublicChat extends Component {
  constructor (props) {
    super(props)

    this.state = {
      connected: false,
      input: '',
      isSending: false,
      log: [],
      nickname: '',
      selfID: ''
    }

    this.socket = null
  }

  async componentDidMount () {
    const { default: io } = await import('socket.io-client')

    const socket = io(URL)

    socket.on('connect', () => {
      this.setState({
        selfID: socket.id,
        connected: true
      })
    })

    socket.on('error', console.error)

    socket.on('message', ({ username, message }) => {
      this.addToLog(message, username)
    })

    this.socket = socket
  }

  componentWillUnmount () {
    const { socket } = this

    if (socket !== null) {
      socket.close()
    }
  }

  setNickname (e) {
    e.preventDefault()

    const { input } = this.state

    this.setState({
      input: '',
      nickname: input
    })
  }

  sendMessage (e) {
    e.preventDefault()

    const { socket, state: { input, nickname } } = this

    const inputText = input.trim()

    if (inputText === '') {
      return
    }

    this.setState({ isSending: true }, () => {
      socket.emit(
        'message',
        {
          username: nickname,
          message: inputText
        },
        () => {
          this.addToLog(inputText, `${nickname} (You)`)
          this.setState({ input: '', isSending: false })
        }
      )
    })
  }

  addToLog (text, username) {
    this.setState(prevState => ({
      log: [
        ...prevState.log,
        {
          message: text,
          timestamp: moment()
            .utc()
            .valueOf(),
          username
        }
      ]
    }))
  }

  render () {
    const { connected, input, isSending, log, nickname, selfID } = this.state

    return (
      <section className='public'>
        <h3>Public Chat</h3>

        {connected && (
          <Fragment>
            <h4>Hello, {nickname || selfID}</h4>
            <Chat log={log} />
          </Fragment>
        )}

        {connected && (
          <form
            onSubmit={e => {
              if (!nickname) {
                this.setNickname(e)
              } else {
                this.sendMessage(e)
              }
            }}
          >
            {isSending && 'Sending...'}
            <input
              type='text'
              value={input}
              onChange={e =>
                this.setState({
                  input: e.target.value
                })
              }
              placeholder={nickname ? 'Send a message' : 'Choose a nickname'}
            />
          </form>
        )}
      </section>
    )
  }
}
