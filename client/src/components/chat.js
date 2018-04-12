import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Chat extends Component {
  componentDidUpdate () {
    this.scrollToBottom()
  }

  scrollToBottom () {
    this.chatLog.scrollTop = this.chatLog.scrollHeight
  }

  render () {
    const { log } = this.props

    return (
      <section className='chat' ref={chatLog => (this.chatLog = chatLog)}>
        {log.map(({ message, username, timestamp }) => (
          <section className='entry' key={`${username}-${timestamp}`}>
            {username || 'guest'}: <span className='message'>{message}</span>
          </section>
        ))}
      </section>
    )
  }
}

Chat.propTypes = {
  log: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string.isRequired,
      username: PropTypes.string,
      timestamp: PropTypes.number.isRequired
    })
  ).isRequired
}
