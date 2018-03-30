import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

export const Chat = ({ log }) => (
  <Fragment>
    {log.map(({ text, username, timestamp }) => (
      <section key={timestamp}>
        {username}: {text}
      </section>
    ))}
  </Fragment>
)

Chat.propTypes = {
  log: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired
    })
  ).isRequired
}
