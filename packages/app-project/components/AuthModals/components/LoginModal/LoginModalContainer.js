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
    this.onSubmit = this.onSubmit.bind(this)
    this.state = {
      error: '',
      loading: false
    }
  }

  onSubmit ({ value }) {
    const { closeLoginModal, store } = this.props
    this.setState({ loading: true })
    auth.signIn(value)
      .then(userResource => {
        console.info(userResource)
        this.setState({ loading: false })
        store.user.set(userResource)
        closeLoginModal()
      })
      .catch(error => {
        this.setState({
          error: error.message,
          loading: false
        })
      })
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
