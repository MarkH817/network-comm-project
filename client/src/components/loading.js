import React from 'react'

export const Loading = ({ className, error, pastDelay }) => {
  if (error) {
    return <section className={className}>Error!</section>
  } else if (pastDelay) {
    return <section className={className}>Loading...</section>
  } else {
    return <section className={className} />
  }
}
