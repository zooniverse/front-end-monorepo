import auth from 'panoptes-client/lib/auth'
import { func, shape, string } from 'prop-types'
import { useState } from 'react'

import { useTranslation } from '../../../translations/i18n'
import RegisterForm from './RegisterForm'

const DEFAULT_HANDLER = () => true

// The error handler in the panoptes-javascript-client still doesn't return the vanilla error message
// It swallows an error message array into a string, so now we have to do things like this :(
function errorTest(errorMessage, regex) {
  return regex.test(errorMessage)
}

function validationErrors({ email, emailConfirm, password, passwordConfirm, privacyAgreement }) {
  let errors = {}
  if (email !== emailConfirm) {
    errors.emailConfirm = 'AuthModal.RegisterForm.emailConfirmError'
  }
  if (password !== passwordConfirm) {
    errors.passwordConfirm = 'AuthModal.RegisterForm.passwordConfirmError'
  }
  if (!privacyAgreement) {
    errors.privacyAgreement = 'AuthModal.RegisterForm.privacyAgreementError'
  }
  return Object.entries(errors)
}

export default function RegisterFormContainer({
  closeModal = DEFAULT_HANDLER,
  project = null,
  onSignIn = DEFAULT_HANDLER
}) {
  const { t } = useTranslation()
  const [error, setError] = useState('')

  function validate(values) {
    const errorKeys = validationErrors(values)
    const errorMessages = errorKeys.map(([field, translationKey]) => [field, t(translationKey)])
    return Object.fromEntries(errorMessages)
  }

  async function onSubmit(values, { setFieldError, setSubmitting }) {
    console.log('submitting...')
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
      project_email_communication: emailListSignUp,
      project_id: project?.id
    }

    try {
      const user = await auth.register(valuesToSubmit)
      onSignIn(user)
      setSubmitting(false)
      closeModal()
    } catch (error) {
      console.error(error)
      const usernameConflict = errorTest(error.message, emailErrorRegex)
      const emailConflict = errorTest(error.message, usernameErrorRegex)
      if (usernameConflict) {
        setFieldError('email', t('AuthModal.RegisterForm.emailConflict'))
      }
      if (emailConflict) {
        setFieldError('username', t('AuthModal.RegisterForm.usernameConflict'))
      }
      if (error.message && !usernameConflict && !emailConflict) {
        setError(error.message)
      }
      setSubmitting(false)
    }
  }

  return (
    <RegisterForm
      generalError={error}
      onSubmit={onSubmit}
      validate={validate}
    />
  )
}

RegisterFormContainer.propTypes = {
  closeModal: func,
  project: shape({
    id: string
  }),
  /** Callback to handle user state in parent app (such as a mobx store) */
  onSignIn: func
}
