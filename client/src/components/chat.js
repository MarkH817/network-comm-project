import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

export const Chat = ({ log }) => (
  <Fragment>
    {log.map(({ message, username, timestamp }) => (
      <section key={timestamp}>
        {username || 'guest'}: {message}
      </section>
    ))}
  </Fragment>
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
