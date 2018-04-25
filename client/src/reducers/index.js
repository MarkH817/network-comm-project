import { combineReducers } from 'redux'

import { peerChat } from './peerChat'
import { publicChat } from './publicChat'
import { roster } from './roster'

export const app = combineReducers({
  peerChat,
  publicChat,
  roster
})
