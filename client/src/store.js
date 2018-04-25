import { createStore } from 'redux'

import { app } from './reducers'

/**
 * Get an instance of the Redux store
 * @returns {Store} A Redux store that holds the application state
 */
export const getStore = () =>
  createStore(
    app,
    typeof window !== 'undefined' &&
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
  )
