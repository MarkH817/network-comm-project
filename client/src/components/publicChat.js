import React, { PureComponent } from 'react'
import Loadable from 'react-loadable'
import { connect } from 'react-redux'

import {
  addMessage,
  addError,
  connect as connectChat,
  disconnect as disconnectChat,
  disableChat,
  enableChat
} from '../actions/publicChat'
import { Loading } from './loading'

const Chat = Loadable({
  loader: () => import('./chat'),
  loading: Loading
})

const MessageInput = Loadable({
  loader: () => import('./messageInput'),
  loading: Loading
})

export class PublicChatPresentation extends PureComponent {
  constructor (props) {
    super(props)

    this.emitMessage = this.emitMessage.bind(this)

    this.socket = null
  }

  async componentDidMount () {
    if (typeof window === 'undefined') {
      return
    }

    const {
      addError,
      addMessage,
      connectChat,
      disconnectChat,
      enableChat,
      disableChat,
      socketPromise
    } = this.props

    // Connect socket events to Redux store
    const socket = await socketPromise

    socket.on('connect', () => {
      connectChat()
      enableChat()
    })

    socket.on('disconnect', () => {
      disableChat()
      disconnectChat()
    })

    socket.on('message', ({ id, timestamp, message }) => {
      addMessage(id, timestamp, message)
    })

    socket.on('error', addError)

    this.socket = socket
  }

  componentWillUnmount () {
    if (this.socket !== null) {
      this.socket.close()
      this.socket = null
    }
  }

  /**
   * Sends the message to the Socket.io server
   * @param {String} message
   */
  emitMessage (message) {
    const {
      props: { addMessage, disableChat, enableChat },
      socket
    } = this

    return new Promise(resolve => {
      const timestamp = Date.now().valueOf()

      disableChat()

      socket.emit(
        'message',
        {
          message,
          timestamp
        },
        () => {
          addMessage(socket.id, timestamp, message)
          enableChat()
          resolve()
        }
      )
    })
  }

  render () {
    const { className, addError, connected, enabled, log, users } = this.props

    return (
      <section className={className}>
        <h3>
          Public Chat
          {!connected && <span className='fadeInOut'> (loading)</span>}
        </h3>

        <Chat className='chat' log={log} users={users} />

        <MessageInput
          enabled={enabled}
          reportError={addError}
          submit={this.emitMessage}
          placeholderText={
            connected
              ? 'Submit message to public chat.'
              : 'Connecting to server.'
          }
        />
      </section>
    )
  }
}

const mapStateToProps = ({
  roster: { users },
  publicChat: { connected, enabled, log }
}) => ({ connected, enabled, log, users })

const mapDispatchToProps = dispatch => ({
  addError: err => dispatch(addError(err)),
  addMessage: (id, timestamp, message) =>
    dispatch(addMessage(id, timestamp, message)),
  connectChat: () => dispatch(connectChat()),
  disconnectChat: () => dispatch(disconnectChat()),
  disableChat: () => dispatch(disableChat()),
  enableChat: () => dispatch(enableChat())
})

export const PublicChat = connect(mapStateToProps, mapDispatchToProps)(
  PublicChatPresentation
)

export default PublicChat
