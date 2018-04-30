const { expect } = require('chai')

const { peerChat, roster } = require('../src/actions')
const { getStore } = require('../src/store')

describe('peerChat', () => {
  let store = null

  beforeEach('prepares a Redux store instance', () => {
    store = getStore()
  })

  it('connects with a peer', done => {
    store.dispatch(roster.addUser('self'))
    store.dispatch(roster.idSelf('self'))
    store.dispatch(roster.addUser('peer'))
    store.dispatch(peerChat.connectPeer('peer'))

    const {
      peerChat: { peerId }
    } = store.getState()

    expect(peerId).to.equal('peer')
    done()
  })

  it('disconnects from a peer', done => {
    store.dispatch(roster.addUser('self'))
    store.dispatch(roster.idSelf('self'))
    store.dispatch(roster.addUser('peer'))
    store.dispatch(peerChat.connectPeer('peer'))
    store.dispatch(peerChat.disconnectPeer())

    const {
      peerChat: { connected }
    } = store.getState()

    expect(connected).to.equal(false)
    done()
  })

  it('sends a message to the peer', done => {
    store.dispatch(roster.addUser('self'))
    store.dispatch(roster.idSelf('self'))
    store.dispatch(roster.addUser('peer'))
    store.dispatch(peerChat.connectPeer('peer'))
    store.dispatch(peerChat.enableChat())

    store.dispatch(peerChat.disableChat())
    store.dispatch(peerChat.addMessage('self', 1234, 'hey there friend!'))
    store.dispatch(peerChat.enableChat())

    store.dispatch(peerChat.disableChat())
    store.dispatch(peerChat.addMessage('peer', 8234, 'oh hi'))
    store.dispatch(peerChat.enableChat())

    const {
      peerChat: { log }
    } = store.getState()

    expect(log).to.have.lengthOf(2)
    done()
  })
})
