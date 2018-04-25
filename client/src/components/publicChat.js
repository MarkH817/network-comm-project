import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { Chat } from './chat'

export class PublicChatPresentation extends PureComponent {
  render () {
    const { log, users } = this.props

    return <Chat log={log} users={users} />
  }
}

const mapStateToProps = ({ roster: { activeUsers }, publicChat: { log } }) => ({
  log,
  users: activeUsers
})

export const PublicChat = connect(mapStateToProps)(PublicChatPresentation)
