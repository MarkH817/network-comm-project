const { expect } = require('chai')

const { roster } = require('../src/actions')
const { getStore } = require('../src/store')

describe('roster', () => {
  let store = null

  beforeEach('prepares a Redux store instance', () => {
    store = getStore()
  })

  it('initializes the user list with already active users', done => {
    store.dispatch(
      roster.initializeRoster([
        { id: 'meow', username: 'Peaches' },
        { id: 'bark', username: 'Emma' }
      ])
    )

    const {
      roster: { users }
    } = store.getState()

    expect(users).to.have.lengthOf(2)
    done()
  })

  it('adds users', done => {
    store.dispatch(roster.addUser('meow'))
    store.dispatch(roster.addUser('bark'))

    const {
      roster: { users }
    } = store.getState()

    expect(users).to.have.lengthOf(2)
    done()
  })

  it('updates a username', done => {
    store.dispatch(roster.addUser('meow'))
    store.dispatch(roster.updateUserName('meow', 'peaches'))

    const {
      roster: { users }
    } = store.getState()

    expect(users).to.have.lengthOf(1)
    expect(users[0]).to.contain({
      id: 'meow',
      username: 'peaches'
    })
    done()
  })
})
