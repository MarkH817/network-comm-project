import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Chat } from './chat'
import { MessageInput } from './messageInput'
import {
  addMessage,
  addError,
  disableChat,
  enableChat
} from '../actions/publicChat'

export class PublicChatPresentation extends PureComponent {
  constructor (props) {
    super(props)

    this.emitMessage = this.emitMessage.bind(this)
  }

  /**
   * Sends the message to the Socket.io server
   * @param {String} message
   */
  emitMessage (message) {
    const { addMessage, disableChat, enableChat, socket } = this.props

    return new Promise((resolve, reject) => {
      disableChat()

      import('moment')
        .then(({ default: { utc } }) => {
          const timestamp = utc().valueOf()

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
        .catch(err => {
          enableChat()
          reject(err)
        })
    })
  }

  render () {
    const { addError, enabled, log, users } = this.props

    return (
      <Fragment>
        <Chat log={log} users={users} />

        <MessageInput
          enabled={enabled}
          reportError={addError}
          submit={this.emitMessage}
        />
      </Fragment>
    )
  }
}

PublicChatPresentation.propTypes = {
  socket: PropTypes.object.isRequired
}

const mapStateToProps = ({
  roster: { activeUsers },
  publicChat: { enabled, log }
}) => ({
  enabled,
  log,
  users: activeUsers
})

const mapDispatchToProps = dispatch => ({
  addError: err => dispatch(addError(err)),
  disableChat: () => dispatch(disableChat()),
  enableChat: () => dispatch(enableChat()),
  addMessage: (id, timestamp, message) =>
    dispatch(addMessage(id, timestamp, message))
})

export const PublicChat = connect(mapStateToProps, mapDispatchToProps)(
  PublicChatPresentation
)
