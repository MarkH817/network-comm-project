import React, { PureComponent } from 'react'
import Loadable from 'react-loadable'
import { connect } from 'react-redux'

import {
  addMessage,
  addError,
  connectPeer,
  disconnectPeer,
  enableChat,
  disableChat
} from '../actions/peerChat'
import { Loading } from './loading'
import { getPeer } from '../utils'

const Chat = Loadable({
  loader: () => import('./chat'),
  loading: Loading
})

const MessageInput = Loadable({
  loader: () => import('./messageInput'),
  loading: Loading
})

export class PeerChatPresentation extends PureComponent {
  constructor (props) {
    super(props)

    this.peer = null
    this.socket = null

    this.setPeer = this.setPeer.bind(this)
    this.receiveSignal = this.receiveSignal.bind(this)
    this.emitMessage = this.emitMessage.bind(this)
  }

  async componentDidMount () {
    if (typeof window === 'undefined') {
      return
    }

    const { socketPromise } = this.props

    const socket = await socketPromise

    socket.on('peer-availability', peerId => {
      const { connected } = this.props
      socket.emit('peer-isAvailable', peerId, !connected)

      if (!connected) {
        this.setPeer(false, peerId)
      }
    })

    // This is for users who are initiating the connection
    socket.on('peer-isAvailable', (peerId, isAvailable) => {
      if (!isAvailable) {
        return
      }

      this.setPeer(true, peerId)
    })

    socket.on('peer-receiveSignal', this.receiveSignal)

    this.socket = socket
  }

  componentWillUnmount () {
    this.clearPeer()
  }

  /**
   * Create peer instance connection
   * @param {Boolean} isInitiator
   * @param {String} peerId
   */
  async setPeer (isInitiator, peerId) {
    if (this.peer !== null) {
      return
    }

    const {
      addError,
      addMessage,
      connectPeer,
      disconnectPeer,
      enableChat,
      disableChat
    } = this.props

    const peer = await getPeer(isInitiator)

    peer.on('signal', data => {
      this.sendSignal(peerId, data)
    })

    peer.on('connect', () => {
      connectPeer(peerId)
      enableChat()
    })

    peer.on('close', () => {
      disableChat()
      disconnectPeer()

      this.clearPeer()
    })

    // receive messages
    peer.on('data', data => {
      const { timestamp, message } = JSON.parse(data.toString())
      addMessage(peerId, timestamp, message)
    })

    peer.on('error', addError)

    this.peer = peer
  }

  /**
   * Send signal data to peer over socket
   * @param {String} peerId
   * @param {Object} signal
   */
  sendSignal (peerId, signal) {
    if (this.socket === null) {
      return
    }

    this.socket.emit('peer-sendSignal', peerId, signal)
  }

  /**
   * Recieve webRTC signal data
   * @param {Object} signal
   */
  receiveSignal (signal) {
    if (this.peer === null) {
      return
    }

    this.peer.signal(signal)
  }

  clearPeer () {
    if (this.peer !== null) {
      this.peer.destroy()
      this.peer = null
    }
  }

  /**
   * Sends the message to the peer
   * @param {String} message
   */
  async emitMessage (message) {
    const {
      props: { enabled, addMessage, selfId, enableChat, disableChat },
      peer
    } = this

    if (!enabled || peer === null) {
      return
    }

    const timestamp = Date.now().valueOf()

    disableChat()

    peer.send(JSON.stringify({ timestamp, message }))
    addMessage(selfId, timestamp, message)

    enableChat()
  }

  render () {
    const { className, addError, connected, enabled, log, users } = this.props

    return (
      <section className={className || 'peer'}>
        <h3>Peer Chat ({connected ? 'Connected' : 'Not connected'})</h3>

        <Chat className='chat' log={log} users={users} />

        <MessageInput
          enabled={enabled}
          reportError={addError}
          submit={this.emitMessage}
        />
      </section>
    )
  }
}

const mapStateToProps = ({
  roster: { users, selfId },
  peerChat: { connected, enabled, log, peerId }
}) => ({ connected, enabled, log, users, selfId, peerId })

const mapDispatchToProps = dispatch => ({
  addError: err => dispatch(addError(err)),
  addMessage: (id, timestamp, message) =>
    dispatch(addMessage(id, timestamp, message)),
  connectPeer: peerId => dispatch(connectPeer(peerId)),
  disconnectPeer: () => dispatch(disconnectPeer()),
  enableChat: () => dispatch(enableChat()),
  disableChat: () => dispatch(disableChat())
})

export const PeerChat = connect(mapStateToProps, mapDispatchToProps)(
  PeerChatPresentation
)

export default PeerChat
