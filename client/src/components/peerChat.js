import React, { Fragment, PureComponent } from 'react'

import { Chat } from './chat'

export class PeerChat extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      chatLog: [],
      input: '',
      isConnected: false,
      isInitiator: false,
      madeChoice: false,
      selfId: null
    }

    this.peer = null
  }

  async setPeer (isInitiator) {
    this.setState({
      isInitiator,
      madeChoice: true
    })

    const { default: Peer } = await import('simple-peer')

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

    peer.on('error', err => {
      this.addToChatLog(err.message, '[Error]')
    })

    peer.on('close', () => {
      this.addToChatLog('Your peer has left.', '[Info]')
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

    const {
      state: { input },
      peer
    } = this
    const inputText = input.trim()

    if (inputText === '') {
      return
    }

    peer.send(inputText)
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
          timestamp: Date.now().valueOf(),
          username
        }
      ]
    }))
  }

  componentWillUnmount () {
    if (this.peer !== null) {
      this.peer.destroy()
    }
  }

  render () {
    const { chatLog, input, isConnected, madeChoice, selfId } = this.state

    return (
      <section className='peer'>
        <h3>Peer Chat</h3>

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
                <pre>
                  {selfId !== null ? JSON.stringify(selfId, null, 2) : '{...}'}
                </pre>
              </Fragment>
            )}

          {madeChoice && isConnected && <h4>Play nice.</h4>}
        </section>

        {isConnected && <Chat log={chatLog} />}

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
      </section>
    )
  }
}
