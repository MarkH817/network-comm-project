import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export class ChatEntry extends PureComponent {
  render () {
    const { username, hash, message } = this.props

    return (
      <section className='entry'>
        <span className='user'>
          <span className='username'>{username}</span>
          <span className='hash'>#{hash.toString().padStart(4, '0')}</span>
        </span>
        :
        <span className='message'>{message}</span>
      </section>
    )
  }
}

ChatEntry.propTypes = {
  username: PropTypes.string.isRequired,
  hash: PropTypes.number.isRequired,
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
    const { className, log, users } = this.props

    return (
      <section
        className={className || 'chat'}
        ref={chatLog => (this.chatLog = chatLog)}
      >
        {log.map(({ message, id, timestamp }) => {
          const { username, hash } = users.find(user => id === user.id)

          return (
            <ChatEntry
              key={`${id}-${timestamp}`}
              message={message}
              username={username}
              hash={hash}
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
      hash: PropTypes.number.isRequired,
      isActive: PropTypes.bool.isRequired
    })
  ).isRequired
}

export default Chat
