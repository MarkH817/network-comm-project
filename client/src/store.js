import { createStore } from 'redux'

import { app } from './reducers'

/**
 * Get an instance of the Redux store
 * @returns {Store} A Redux store that holds the application state
 */
export const getStore = () => {
  // istanbul ignore next
  if (
    process.env.NODE_ENV !== 'production' &&
    typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION__
  ) {
    return createStore(app, window.__REDUX_DEVTOOLS_EXTENSION__())
  } else {
    return createStore(app)
  }
}
