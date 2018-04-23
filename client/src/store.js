import { createStore } from 'redux'

import { app } from './reducers'

/**
 * Get an instance of the Redux store
 * @returns {Store} A Redux store that holds the application state
 */
export const getStore = () => createStore(app)
