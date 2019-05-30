import auth from 'panoptes-client/lib/auth'
import { inject, observer } from 'mobx-react'
import { func, shape } from 'prop-types'
import React, { Component } from 'react'

import LoginForm from './LoginForm'

class LoginFormContainer extends Component {
  constructor () {
    super()
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit (values, { setFieldError, setSubmitting }) {
    const { authClient, store } = this.props
    return authClient.signIn(values)
      .then(userResource => {
        setSubmitting(false)
        store.user.set(userResource)
        this.props.closeModal()
      })
      .catch(error => {
        setFieldError('password', error.message)
        setSubmitting(false)
      })
  }

  render () {
    return (
      <LoginForm onSubmit={this.onSubmit} />
    )
  }
}

LoginFormContainer.propTypes = {
  authClient: shape({
    signIn: func
  }),
  closeModal: func.isRequired,
  store: shape({
    user: shape({
      set: func
    })
  })
}

LoginFormContainer.defaultProps = {
  authClient: auth,
  closeModal: () => {}
}

@inject('store')
@observer
class DecoratedLoginFormContainer extends LoginFormContainer { }

export default DecoratedLoginFormContainer
export { LoginFormContainer }
