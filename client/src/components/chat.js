import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export class ChatEntry extends PureComponent {
  render () {
    const { username, message } = this.props

    return (
      <section className='entry'>
        <b>{username}</b>: <span className='message'>{message}</span>
      </section>
    )
  }
}

ChatEntry.propTypes = {
  username: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
}

export class Chat extends PureComponent {
  componentDidUpdate () {
    this.scrollToBottom()
  }

  scrollToBottom () {
    this.chatLog.scrollTop = this.chatLog.scrollHeight
  }

  render () {
    const { log, users } = this.props

    return (
      <section className='chat' ref={chatLog => (this.chatLog = chatLog)}>
        {log.map(({ message, id, timestamp }) => {
          const { username } = users.find(user => id === user.id)

          return (
            <ChatEntry
              key={`${id}-${timestamp}`}
              message={message}
              username={username}
            />
          )
        })}
      </section>
    )
  }
}

Chat.propTypes = {
  log: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired
    })
  ).isRequired,

  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      isActive: PropTypes.bool.isRequired
    })
  ).isRequired
}

export default Chat
