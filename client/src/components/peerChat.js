import React, { Component, Fragment } from 'react'
import Peer from 'simple-peer'
import moment from 'moment'

import { Chat } from './chat'

export class PeerChat extends Component {
  constructor (props) {
    super(props)

    this.state = {
      chatLog: [],
      input: '',
      isConnected: false,
      isInitiator: false,
      madeChoice: false,
      selfId: {}
    }

    this.peer = null
  }

  setPeer (isInitiator) {
    this.setState({
      isInitiator,
      madeChoice: true
    })

    const peer = new Peer({
      initiator: isInitiator,
      trickle: false
    })

    peer.on('signal', data => {
      this.setState({
        selfId: data
      })
    })

    peer.on('connect', () => {
      console.log('Connected')

      this.setState({
        isConnected: true
      })
    })

    peer.on('data', data => {
      this.addToChatLog(data.toString(), 'peer')
    })

    this.peer = peer
  }

  signalPeer (e) {
    e.preventDefault()

    const { input } = this.state
    const inputText = input.trim()

    if (inputText === '') {
      return
    }

    try {
      const peerId = JSON.parse(inputText)
      this.peer.signal(peerId)
    } catch (err) {
      console.error(err)
    }

    this.setState({
      input: ''
    })
  }

  messagePeer (e) {
    e.preventDefault()

    const { input } = this.state
    const inputText = input.trim()

    if (inputText === '') {
      return
    }

    this.peer.send(inputText)
    this.addToChatLog(inputText, 'you')

    this.setState({
      input: ''
    })
  }

  addToChatLog (text, username) {
    this.setState(prevState => ({
      chatLog: [
        ...prevState.chatLog,
        {
          message: text,
          timestamp: moment()
            .utc()
            .unix(),
          username
        }
      ]
    }))
  }

  render () {
    const { chatLog, input, isConnected, madeChoice, selfId } = this.state

    return (
      <section className='peer'>
        <section>
          {!madeChoice && (
            <Fragment>
              <button onClick={() => this.setPeer(true)}>
                Initiate conversation
              </button>
              <button onClick={() => this.setPeer(false)}>
                Receive conversation
              </button>
            </Fragment>
          )}

          {madeChoice &&
            !isConnected && (
              <Fragment>
                <p>Your Contact ID</p>
                <pre>{JSON.stringify(selfId, null, 2)}</pre>
              </Fragment>
            )}
        </section>

        <section>
          {madeChoice && (
            <Fragment>
              <form
                onSubmit={e => {
                  if (isConnected) {
                    this.messagePeer(e)
                  } else {
                    this.signalPeer(e)
                  }
                }}
              >
                <input
                  type='text'
                  value={input}
                  onChange={e => this.setState({ input: e.target.value })}
                />
              </form>
            </Fragment>
          )}
        </section>

        {isConnected && (
          <section className='chat-log'>
            <Chat log={chatLog} />
          </section>
        )}
      </section>
    )
  }
}
