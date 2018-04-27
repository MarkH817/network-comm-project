import React from 'react'

export const Loading = ({ error, pastDelay }) => {
  if (error) {
    return <section>Error!</section>
  } else if (pastDelay) {
    return <section>Loading...</section>
  } else {
    return null
  }
}
