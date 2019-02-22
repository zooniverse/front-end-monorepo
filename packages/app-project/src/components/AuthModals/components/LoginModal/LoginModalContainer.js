/* global FormData */
import { inject, observer } from 'mobx-react'
import auth from 'panoptes-client/lib/auth'
import { func, shape } from 'prop-types'
import React, { Component } from 'react'

import LoginModal from './LoginModal'

@inject('store')
@observer
class LoginModalContainer extends Component {
  constructor () {
    super()
    this.onSubmit = this.onSubmit.bind(this)
    this.state = {
      error: '',
      loading: false
    }
  }

  createLoginPayload (formNode) {
    const formData = Array.from(new FormData(formNode))
    const loginPayload = {}
    formData.forEach(([name, value]) => {
      loginPayload[name] = value
    })
    return loginPayload
  }

  onSubmit (event) {
    // Grommet `Form`'s `onSubmit` handler is broken, as it returns an empty
    // object for `event.value` instead of the correct form state. So we work
    // around it by fetching it directly from the DOM in the meantime.
    const loginPayload = this.createLoginPayload(event.target)
    const { authClient, closeLoginModal, store } = this.props
    this.setState({
      error: '',
      loading: true
    })
    authClient.signIn(loginPayload)
      .then(userResource => {
        this.setState({ loading: false })
        store.user.set(userResource)
        closeLoginModal()
      })
      .catch(error => this.setState({
        error: error.message,
        loading: false
      }))
  }

  render () {
    return (
      <LoginModal
        closeLoginModal={this.props.closeLoginModal}
        error={this.state.error}
        loading={this.state.loading}
        onSubmit={this.onSubmit}
      />
    )
  }
}

LoginModalContainer.propTypes = {
  authClient: shape({
    signIn: func
  }),
  closeLoginModal: func,
  store: shape({
    user: shape({
      set: func
    })
  })
}

LoginModalContainer.defaultProps = {
  authClient: auth
}

export default LoginModalContainer
