const { expect } = require('chai')

const { publicChat, roster } = require('../src/actions')
const { getStore } = require('../src/store')

describe('publicChat', () => {
  let store = null

  beforeEach('prepares a Redux store instance', () => {
    store = getStore()
  })

  it('adds new user', done => {
    store.dispatch(publicChat.connect())
    store.dispatch(roster.addUser('meow'))

    const {
      roster: { users }
    } = store.getState()

    expect(users).to.have.lengthOf(1)
    done()
  })

  it('marks a disconnected user as inactive', done => {
    store.dispatch(publicChat.connect())
    store.dispatch(roster.addUser('meow'))
    store.dispatch(roster.addUser('ghost'))
    store.dispatch(roster.inactiveUser('meow'))

    const {
      roster: { users }
    } = store.getState()

    expect(users).to.have.lengthOf(2)
    expect(users.filter(user => user.isActive)).to.have.lengthOf(1)
    done()
  })

  it('adds a message to the log', done => {
    store.dispatch(publicChat.connect())
    store.dispatch(roster.addUser('meow'))
    store.dispatch(publicChat.enableChat())

    store.dispatch(publicChat.disableChat())
    store.dispatch(publicChat.addMessage('meow', 1234, 'hey there!'))
    store.dispatch(publicChat.enableChat())

    store.dispatch(publicChat.disableChat())
    store.dispatch(publicChat.addMessage('meow', 1534, 'i type really fast'))
    store.dispatch(publicChat.enableChat())

    const {
      publicChat: { log }
    } = store.getState()

    expect(log).to.have.lengthOf(2)
    done()
  })

  it('disconnects from the server', done => {
    store.dispatch(publicChat.connect())
    store.dispatch(publicChat.disconnect())

    const {
      publicChat: { connected }
    } = store.getState()

    expect(connected).to.equal(false)
    done()
  })
})
