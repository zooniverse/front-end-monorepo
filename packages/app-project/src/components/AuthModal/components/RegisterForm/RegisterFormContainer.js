import counterpart from 'counterpart'
import { inject, observer } from 'mobx-react'
import auth from 'panoptes-client/lib/auth'
import { debounce } from 'lodash'
import { func, shape } from 'prop-types'
import React, { Component } from 'react'
import en from './locales/en'

import RegisterForm from './RegisterForm'

const REMOTE_CHECK_DELAY = 1000
counterpart.registerTranslations('en', en)

class RegisterFormContainer extends Component {
  constructor() {
    super()
    this.checkEmailForConflict = debounce(this.checkEmailForConflict, REMOTE_CHECK_DELAY)
    this.checkNameForConflict = debounce(this.checkNameForConflict, REMOTE_CHECK_DELAY)
    this.onSubmit = this.onSubmit.bind(this)
    this.validate = this.validate.bind(this)

    this.state = {
      error: ''
    }
  }

  async validate (values) {
    const { email, password, passwordConfirm, username } = values
    let errors = {}

    errors.username = await this.checkNameForConflict(username)
    errors.email = await this.checkEmailForConflict(email)
    errors.passwordConfirm = this.validatePassword(password, passwordConfirm)
    throw errors
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
        if (this.errorTest(error.message, errorRegex)) {
          return counterpart('RegisterForm.usernameConflict')
        }
        return ''
      }
    }

    return ''
  }

  async checkEmailForConflict (email) {
    const { authClient } = this.props
    const errorRegex = /email(.+)taken/mi
    if (email) {
      try {
        await authClient.register({ email })
      } catch (error) {
        if (this.errorTest(error.message, errorRegex)) {
          return counterpart('RegisterForm.emailConflict')
        }
        return ''
      }
    }

    return ''
  }

  // The error handler in the panoptes-javascript-client still doesn't return the vanilla error message
  // It swallows an error message array into a string, so now we have to do things like this :(
  errorTest (errorMessage, regex) {
    return regex.test(errorMessage)
  }

  onSubmit(values, { setFieldError, setSubmitting }) {
    // TODO add log event for google analytics
    const { authClient, store } = this.props
    const { betaListSignUp, email, emailListSignUp, password, realName, username } = values
    const valuesToSubmit = {
      beta_email_communication: betaListSignUp,
      credited_name: realName,
      email,
      global_email_communication: emailListSignUp,
      login: username,
      password,
      project_email_communication: emailListSignUp
    }

    if (store && store.project && store.project.id) {
      valuesToSubmit.project_id = store.project.id
    }

    authClient.register(valuesToSubmit)
      .then(userResource => {
        setSubmitting(false)
        store.user.set(userResource)
        this.props.closeModal()
      })
      .catch(error => {
        console.error(error)
        // Something went very wrong to get to this point...
        this.setState({ error: error.message })
        setSubmitting(false)
      })
  }

  render() {
    return (
      <RegisterForm
        generalError={this.state.error}
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
