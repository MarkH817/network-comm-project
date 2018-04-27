const { expect } = require('chai')

const { roster } = require('../src/actions')
const { getStore } = require('../src/store')

let store = null

describe('roster', () => {
  beforeEach('prepares a Redux store instance', () => {
    store = getStore()
  })

  it('adds new user', done => {
    store.dispatch(roster.addUser('meow'))

    const {
      roster: { activeUsers }
    } = store.getState()

    expect(activeUsers).to.have.lengthOf(1)
    done()
  })
})
