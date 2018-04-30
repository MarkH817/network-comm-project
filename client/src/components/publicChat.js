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
import {
  addUser,
  idSelf,
  initializeRoster,
  inactiveUser,
  updateUserName
} from '../actions/roster'
import { Loading } from './loading'
import { getSocket, randomEntry } from '../utils'

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

  componentDidMount () {
    if (typeof window === 'undefined') {
      return
    }

    const {
      addError,
      addMessage,
      addUser,
      connectChat,
      disconnectChat,
      enableChat,
      disableChat,
      initRoster,
      inactiveUser,
      setId,
      updateUserName
    } = this.props

    // Connect socket events to Redux store
    getSocket()
      .then(socket => {
        socket.on('connect', () => {
          setId(socket.id)
          connectChat()
          enableChat()

          // Demo code - start
          socket.emit(
            'username',
            randomEntry([
              'Mark',
              'Christo',
              'Sam',
              'Jill',
              'Justin',
              'Cristy',
              'Derek',
              'Kat',
              'Matt',
              'Dorian',
              'Reinhardt',
              'Nathan'
            ])
          )
          // Demo code - end
        })

        socket.on('disconnect', () => {
          disableChat()
          disconnectChat()
        })

        socket.on('roster-current', initRoster)

        socket.on('roster-add', addUser)

        socket.on('roster-remove', inactiveUser)

        socket.on('username', ({ id, username }) => {
          updateUserName(id, username)
        })

        socket.on('message', ({ id, timestamp, message }) => {
          addMessage(id, timestamp, message)
        })

        socket.on('error', addError)

        this.socket = socket
      })
      .catch(addError)
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

    return new Promise((resolve, reject) => {
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
        />
      </section>
    )
  }
}

const mapStateToProps = ({
  roster: { users },
  publicChat: { connected, enabled, log }
}) => ({
  connected,
  enabled,
  log,
  users
})

const mapDispatchToProps = dispatch => ({
  addError: err => dispatch(addError(err)),
  addMessage: (id, timestamp, message) =>
    dispatch(addMessage(id, timestamp, message)),
  addUser: id => dispatch(addUser(id)),
  connectChat: () => dispatch(connectChat()),
  disconnectChat: () => dispatch(disconnectChat()),
  disableChat: () => dispatch(disableChat()),
  enableChat: () => dispatch(enableChat()),
  initRoster: users => dispatch(initializeRoster(users)),
  inactiveUser: id => dispatch(inactiveUser(id)),
  setId: id => dispatch(idSelf(id)),
  updateUserName: (id, username) => dispatch(updateUserName(id, username))
})

export const PublicChat = connect(mapStateToProps, mapDispatchToProps)(
  PublicChatPresentation
)

export default PublicChat
