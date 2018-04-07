import React from 'react'
import PropTypes from 'prop-types'

export const Chat = ({ log }) => (
  <section className='chat'>
    {log.map(({ message, username, timestamp }) => (
      <section className='entry' key={timestamp}>
        {username || 'guest'}: <span className='message'>{message}</span>
      </section>
    ))}
  </section>
)

Chat.propTypes = {
  log: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string.isRequired,
      username: PropTypes.string,
      timestamp: PropTypes.number.isRequired
    })
  ).isRequired
}
