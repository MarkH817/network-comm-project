import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

export class User extends PureComponent {
  render () {
    const { username, hash, isActive, isSelf } = this.props

    return (
      <section className='user'>
        <span className='username'>{username}</span>

        <span className='hash'>#{hash.toString().padStart(4, '0')}</span>

        <span className='info'>
          {isSelf && '(You)'}
          {!isActive && '[Inactive]'}
        </span>
      </section>
    )
  }
}

export class RosterPresentation extends PureComponent {
  render () {
    const { className, selfId, users } = this.props

    return (
      <section className={className}>
        <h3>Roster</h3>

        {users.map(user => (
          <User
            key={user.id}
            username={user.username}
            hash={user.hash}
            isActive={user.isActive}
            isSelf={user.id === selfId}
          />
        ))}
      </section>
    )
  }
}

const mapStateToProps = ({ roster: { selfId, users } }) => ({
  selfId,
  users
})

export const Roster = connect(mapStateToProps)(RosterPresentation)

export default Roster
