import { inject, observer } from 'mobx-react'
import auth from 'panoptes-client/lib/auth'
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
      isBrowser: false,
      loading: false
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
    const { closeLoginModal, store } = this.props
    this.setState({ loading: true })
    auth.signIn(this.state.form)
      .then(userResource => {
        console.info(userResource)
        this.setState({ loading: false })
        store.user.set(userResource)
        closeLoginModal()
      })
      .catch(error => {
        console.info(error)
        this.setState({ loading: false })
      })
  }

  updateField (event) {
    const { name, value } = event.target
    const newState = Object.assign({}, this.state)
    newState.form[name] = value
    this.setState(newState)
  }

  render () {
    if (!this.state.isBrowser) {
      return null
    }

    const loginEnabled = this.canLogin()
    const { closeLoginModal } = this.props
    return (
      <LoginModal
        canLogin={loginEnabled}
        closeLoginModal={closeLoginModal}
        formState={this.state.form}
        loading={this.state.loading}
        submit={this.submit}
        updateField={this.updateField}
      />
    )
  }
}
