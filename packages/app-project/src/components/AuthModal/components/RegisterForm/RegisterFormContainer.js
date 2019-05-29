import { inject, observer } from 'mobx-react'
import auth from 'panoptes-client/lib/auth'
import { func, shape } from 'prop-types'
import React, { Component } from 'react'

import RegisterForm from './RegisterForm'

class RegisterFormContainer extends Component {
  constructor() {
    super()
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(values, { setFieldError, setSubmitting }) {
    const { authClient, store } = this.props
    authClient.register(values)
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

  render() {
    return (
      <RegisterForm onSubmit={this.onSubmit} />
    )
  }
}

RegisterFormContainer.propTypes = {
  authClient: shape({
    register: func
  }),
  closeModal: func,
  store: shape({
    user: shape({
      set: func
    })
  })
}

RegisterFormContainer.defaultProps = {
  authClient: auth,
  closeModal: () => { }
}

@inject('store')
@observer
class DecoratedRegisterFormContainer extends RegisterFormContainer { }

export default DecoratedRegisterFormContainer
export { RegisterFormContainer }
