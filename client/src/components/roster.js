import React, { Fragment, PureComponent } from 'react'
import { connect } from 'react-redux'

export class RosterPresentation extends PureComponent {
  render () {
    const { selfId, users } = this.props

    return (
      <Fragment>
        {users.map(user => (
          <p key={user.id}>
            {user.username} {user.id === selfId ? '(You)' : null}
            {!user.isActive && '[Disconnected]'}
          </p>
        ))}
      </Fragment>
    )
  }
}

const mapStateToProps = ({ roster: { selfId, activeUsers } }) => ({
  selfId,
  users: activeUsers
})

export const Roster = connect(mapStateToProps)(RosterPresentation)
