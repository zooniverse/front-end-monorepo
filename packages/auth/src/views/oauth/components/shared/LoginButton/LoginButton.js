import counterpart from 'counterpart'
import PropTypes from 'prop-types'
import React from 'react'

import Button from '../Button'
import WithClientContext from './WithClientContext'
import en from './locales/en'

counterpart.registerTranslations('en', en)

class LoginButton extends React.Component {
  constructor () {
    super()
    this.login = this.login.bind(this)
  }

  login () {
    window.location.href = this.props.client.token.getUri()
  }

  render () {
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
