import { inject, observer } from 'mobx-react'
import auth from 'panoptes-client/lib/auth'
import { func, shape } from 'prop-types'
import { Component } from 'react'
import { withTranslation } from 'next-i18next'

import RegisterForm from './RegisterForm'

class RegisterFormContainer extends Component {
  constructor () {
    super()
    this.onSubmit = this.onSubmit.bind(this)
    this.validate = this.validate.bind(this)

    this.state = {
      error: ''
    }
  }

  
  validate (values) {
    const { t } = this.props
    const { email, emailConfirm, password, passwordConfirm, privacyAgreement } = values
    let errors = {}
    if (email !== emailConfirm) {
      errors.emailConfirm = t('AuthModal.RegisterForm.emailConfirmError')
    }
    if (password !== passwordConfirm) {
      errors.passwordConfirm = t('AuthModal.RegisterForm.passwordConfirmError')
    }
    if (!privacyAgreement) {
      errors.privacyAgreement = t('AuthModal.RegisterForm.privacyAgreementError')
    }
    return errors
  }

  // The error handler in the panoptes-javascript-client still doesn't return the vanilla error message
  // It swallows an error message array into a string, so now we have to do things like this :(
  errorTest (errorMessage, regex) {
    return regex.test(errorMessage)
  }

  onSubmit (values, { setFieldError, setSubmitting }) {
    console.log('submitting...')
    // TODO add log event for google analytics
    const { authClient, store, t } = this.props
    const { betaListSignUp, email, emailListSignUp, password, realName, username } = values
    const emailErrorRegex = /email(.+)taken/mi
    const usernameErrorRegex = /login(.+)taken/mi
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

    return authClient.register(valuesToSubmit)
      .then(userResource => {
        setSubmitting(false)
        store.user.set(userResource)
        this.props.closeModal()
      }).catch(error => {
        console.error(error)
        const usernameConflict = this.errorTest(error.message, emailErrorRegex)
        const emailConflict = this.errorTest(error.message, usernameErrorRegex)
        if (usernameConflict) {
          setFieldError('email', t('AuthModal.RegisterForm.emailConflict'))
        }
        if (emailConflict) {
          setFieldError('username', t('AuthModal.RegisterForm.usernameConflict'))
        }
        if (error.message && !usernameConflict && !emailConflict) {
          this.setState({ error: error.message })
        }
        setSubmitting(false)
      })
  }

  render () {
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
  }),
  t: func
}

RegisterFormContainer.defaultProps = {
  authClient: auth,
  closeModal: () => { },
  t: (key) => key
}

@inject('store')
@observer
class DecoratedRegisterFormContainer extends RegisterFormContainer { }

export default withTranslation('components')(DecoratedRegisterFormContainer)
export { RegisterFormContainer }
