import counterpart from 'counterpart'
import PropTypes from 'prop-types'
import React from 'react'

import Button from '../Button'
import WithClientContext from './WithClientContext'
import en from './locales/en'

class LoginButton extends React.Component {
  constructor () {
    super()
    this.login = this.login.bind(this)
  }

  login () {
    window.open(this.props.client.token.getUri(), '_self')
  }

  render () {
    console.info(this.props)
    return (
      <Button
        label={this.props.label}
        onClick={this.login}
      />
    )
  }
}

LoginButton.propTypes = {
  client: PropTypes.shape({
    token: PropTypes.shape({
      getUri: PropTypes.func.isRequired
    }).isRequired
  }).isRequired,
  label: PropTypes.string
}

LoginButton.defaultProps = {
  label: counterpart('LoginButton.label')
}

export default WithClientContext(LoginButton)
