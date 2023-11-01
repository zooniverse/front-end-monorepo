import auth from 'panoptes-client/lib/auth'
import { func, shape } from 'prop-types'
import { useState } from 'react'

import { useTranslation } from '../../../translations/i18n'
import LoginForm from './LoginForm'

const DEFAULT_HANDLER = () => true

export default function LoginFormContainer({
  closeModal = DEFAULT_HANDLER
}) {
  const { t } = useTranslation()
  const [error, setError] = useState('')

  async function onSubmit(values, { setFieldError, setSubmitting }) {
    if (error) setError('')
    try {
      const user = await auth.signIn(values)
      setSubmitting(false)
      closeModal()
    } catch (error) {
      console.error(error)
      if (error && error.message === 'Invalid email or password.') {
        const errorMessage = t('AuthModal.LoginForm.error')
        setFieldError('login', errorMessage)
        setFieldError('password', errorMessage)
      } else {
        setError(error.message)
      }
      setSubmitting(false)
    }
  }

  return (
    <LoginForm generalError={error} onSubmit={onSubmit} />
  )
}
