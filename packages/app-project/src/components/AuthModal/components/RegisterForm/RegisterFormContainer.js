import { inject, observer } from 'mobx-react'
import auth from 'panoptes-client/lib/auth'
import { debounce } from 'lodash'
import { func, shape } from 'prop-types'
import React, { Component } from 'react'

import RegisterForm from './RegisterForm'

const REMOTE_CHECK_DELAY = 1000

class RegisterFormContainer extends Component {
  constructor() {
    super()
    this.checkEmailForConflict = debounce(this.checkEmailForConflict, REMOTE_CHECK_DELAY)
    this.checkNameForConflict = debounce(this.checkNameForConflict, REMOTE_CHECK_DELAY)
    this.onSubmit = this.onSubmit.bind(this)
    this.validate = this.validate.bind(this)
  }

  async validate (values) {
    const { email, password, passwordConfirm, username } = values
    let errors = {}
    let hasNameBeenTaken = false
    let hasEmailBeenTaken = false
    hasNameBeenTaken = await this.checkNameForConflict(username)
    hasEmailBeenTaken = await this.checkEmailForConflict(email)
    console.log('hasNameBeenTaken', hasNameBeenTaken)
    if (hasNameBeenTaken) errors.username = counterpart('RegisterForm.nameConflict')
    if (hasEmailBeenTaken) errors.email = counterpart('RegisterForm.emailConflict')

    errors.passwordConfirm = this.validatePassword(password, passwordConfirm)
    console.log('error', errors)
    return errors
  }

  validatePassword (password, passwordConfirm) {
    if (password !== passwordConfirm) {
      return counterpart('RegisterForm.passwordConfirmError')
    }

    return ''
  }

  async checkNameForConflict (username) {
    const { authClient } = this.props
    const errorRegex = /login(.+)taken/mi
    if (username) {
      try {
        await authClient.register({ login: username })
      } catch (error) {
        return this.errorTest(error.message, errorRegex)
      }
    }

    return false
  }

  async checkEmailForConflict (email) {
    const { authClient } = this.props
    const errorRegex = /email(.+)taken/mi
    if (email) {
      try {
        await authClient.register({ email })
      } catch (error) {
        return this.errorTest(error.message, errorRegex)
      }
    }

    return false
  }

  errorTest (errorMessage, regex) {
    return regex.test(errorMessage)
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
        console.log(error)
        setFieldError('password', error.message)
        setSubmitting(false)
      })
  }

  render() {
    return (
      <RegisterForm
        onSubmit={this.onSubmit}
        validate={this.validate}
      />
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
