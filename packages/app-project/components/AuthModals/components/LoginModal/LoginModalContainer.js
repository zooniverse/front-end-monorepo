import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import LoginModal from './LoginModal'

@inject('store')
@observer
export default class LoginModalContainer extends Component {
  constructor () {
    super()
    this.submit = this.submit.bind(this)
    this.updateField = this.updateField.bind(this)
    this.state = {
      form: {
        login: '',
        password: ''
      },
      isBrowser: false
    }
  }

  componentDidMount () {
    this.setState({ isBrowser: true })
  }

  canLogin () {
    const { login, password } = this.state.form
    return login.length > 2 && password.length > 2
  }

  submit () {
    console.info(this.state.form)
  }

  updateField (event) {
    const { name, value } = event.target
    const newState = Object.assign({}, this.state)
    newState.form[name] = value
    this.setState(newState)
  }

  render () {
    const loginEnabled = this.canLogin()
    const { closeLoginModal } = this.props
    return (this.state.isBrowser)
      ? <LoginModal
          canLogin={loginEnabled}
          closeLoginModal={closeLoginModal}
          formState={this.state.form}
          submit={this.submit}
          updateField={this.updateField}
        />
      : null
  }
}
