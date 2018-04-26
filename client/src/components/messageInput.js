import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export class MessageInput extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      text: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }

  handleSubmit (event) {
    event.preventDefault()

    const input = this.state.text.trim()
    const { reportError, submit } = this.props

    if (input === '') {
      return
    }

    submit(input)
      .then(() => {
        this.setState({ text: '' })
      })
      .catch(reportError)
  }

  handleInput (event) {
    const text = event.target.value

    this.setState({ text })
  }

  render () {
    const {
      state: { text },
      props: { enabled }
    } = this

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type='text'
          value={text}
          onChange={this.handleInput}
          disabled={!enabled}
        />
      </form>
    )
  }
}

MessageInput.propTypes = {
  enabled: PropTypes.bool.isRequired,
  reportError: PropTypes.func,
  submit: PropTypes.func.isRequired
}

MessageInput.defaultProps = {
  reportError: err => console.error(err)
}
