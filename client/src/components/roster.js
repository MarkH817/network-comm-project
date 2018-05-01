import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import {
  addUser,
  idSelf,
  initializeRoster,
  inactiveUser,
  updateUserName
} from '../actions/roster'
import { randomEntry } from '../utils'

export class User extends PureComponent {
  constructor (props) {
    super(props)

    this.poked = this.poked.bind(this)
  }

  poked (e) {
    e.preventDefault()

    const { id, poke } = this.props

    poke(id)
  }

  render () {
    const { username, hash, isActive, canPoke, isSelf } = this.props

    return (
      <section className='user'>
        <span className='username'>{username.padEnd(20, ' ')}</span>

        <span className='hash'>#{hash.toString().padStart(4, '0')}</span>

        <span className='info'>
          {isSelf && '(You)'}

          {!isActive && '[Inactive] '}

          {!isSelf && (
            <button
              onClick={this.poked}
              className='pseudo'
              disabled={!isActive || !canPoke}
            >
              Poke
            </button>
          )}
        </span>
      </section>
    )
  }
}

export class RosterPresentation extends PureComponent {
  constructor (props) {
    super(props)

    this.pokeUser = this.pokeUser.bind(this)
  }

  async componentDidMount () {
    if (typeof window === 'undefined') {
      return
    }

    const {
      socketPromise,
      setId,
      initRoster,
      addUser,
      inactiveUser,
      updateUserName
    } = this.props

    const socket = await socketPromise

    socket.on('connect', () => {
      setId(socket.id)

      socket.emit(
        'username',
        randomEntry([
          'Mark',
          'Christo',
          'Sam',
          'Jill',
          'Justin',
          'Cristy',
          'Derek',
          'Kat',
          'Matt',
          'Dorian',
          'Reinhardt',
          'Nathan'
        ])
      )
    })

    socket.on('roster-current', initRoster)
    socket.on('roster-add', addUser)
    socket.on('roster-remove', inactiveUser)
    socket.on('username', ({ id, username }) => updateUserName(id, username))
  }

  async pokeUser (socketId) {
    const { socketPromise } = this.props

    const socket = await socketPromise

    socket.emit('peer-checkAvailability', socketId)
  }

  render () {
    const { className, selfId, users, peerConnected } = this.props

    return (
      <section className={className}>
        <h3>Roster</h3>

        {users.map(user => (
          <User
            key={user.id}
            id={user.id}
            username={user.username}
            hash={user.hash}
            isActive={user.isActive}
            isSelf={user.id === selfId}
            poke={this.pokeUser}
            canPoke={!peerConnected}
          />
        ))}
      </section>
    )
  }
}

const mapStateToProps = ({
  roster: { selfId, users },
  peerChat: { connected: peerConnected }
}) => ({
  selfId,
  users,
  peerConnected
})

const mapDispatchToProps = dispatch => ({
  setId: id => dispatch(idSelf(id)),
  initRoster: users => dispatch(initializeRoster(users)),
  addUser: id => dispatch(addUser(id)),
  inactiveUser: id => dispatch(inactiveUser(id)),
  updateUserName: (id, username) => dispatch(updateUserName(id, username))
})

export const Roster = connect(mapStateToProps, mapDispatchToProps)(
  RosterPresentation
)

export default Roster
