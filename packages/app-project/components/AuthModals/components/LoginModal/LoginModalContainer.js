import { inject, observer } from 'mobx-react'
import auth from 'panoptes-client/lib/auth'
import { func, shape } from 'prop-types'
import React, { Component } from 'react'

import LoginModal from './LoginModal'

@inject('store')
@observer
export default class LoginModalContainer extends Component {
  constructor () {
    super()
    this.onSubmit = this.onSubmit.bind(this)
    this.state = {
      error: '',
      loading: false
    }
  }

  onSubmit ({ value }) {
    const { authClient, closeLoginModal, store } = this.props
    this.setState({
      error: '',
      loading: true
    })
    authClient.signIn(value)
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
    signIn: func,
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
