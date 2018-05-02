import React, { PureComponent } from 'react'
import Loadable from 'react-loadable'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'

import {
  addUser,
  idSelf,
  initializeRoster,
  inactiveUser,
  updateUserName
} from '../actions/roster'
import { Loading } from './loading'

const MessageInput = Loadable({
  loader: () => import('./messageInput'),
  loading: Loading
})

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
        {isSelf && (
          <Helmet
            title={`Web Chat (${username}#${hash.toString().padStart(4, '0')})`}
          />
        )}

        <button className='pseudo' disabled>
          <span className='username'>{username.padEnd(20, ' ')}</span>

          <span className='hash'>#{hash.toString().padStart(4, '0')}</span>
        </button>

        <span className='info'>
          {(isSelf || !isActive) && (
            <button className='pseudo' disabled>
              {isSelf && '(You)'}

              {!isActive && '[Inactive] '}
            </button>
          )}

          {!isSelf &&
            isActive && (
              <button
                onClick={this.poked}
                className='pseudo'
                disabled={!canPoke}
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
    this.setUsername = this.setUsername.bind(this)
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
    })

    socket.on('roster-current', initRoster)
    socket.on('roster-add', addUser)
    socket.on('roster-remove', inactiveUser)
    socket.on('username', ({ id, username }) => updateUserName(id, username))
  }

  /**
   * Set self username
   * @param {String} username
   */
  async setUsername (username) {
    const socket = await this.props.socketPromise

    socket.emit('username', username)
  }

  /**
   * Connect with a user if they are available for a P2P connection
   * @param {String} socketId
   */
  async pokeUser (socketId) {
    const { socketPromise } = this.props

    const socket = await socketPromise

    socket.emit('peer-checkAvailability', socketId)
  }

  render () {
    const {
      className,
      selfId,
      users,
      publicConnected,
      peerConnected
    } = this.props

    if (users.length === 0) {
      return <section className={className} />
    }

    return (
      <section className={className}>
        <h3>Roster</h3>

        <MessageInput
          enabled={publicConnected}
          submit={this.setUsername}
          placeholderText={
            publicConnected
              ? 'Set your username.'
              : 'Hold on. Connecting to server.'
          }
        />

        <section className='list'>
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
      </section>
    )
  }
}

const mapStateToProps = ({
  peerChat: { connected: peerConnected },
  publicChat: { connected: publicConnected },
  roster: { selfId, users }
}) => ({
  selfId,
  users,
  publicConnected,
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
