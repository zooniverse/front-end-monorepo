import { useRef, useState } from 'react'
import { Form, Heading, Paragraph, TextInput } from 'grommet'
import { Trans, useTranslation } from '@translations/i18n'
import styled, { css } from 'styled-components'
import { bool } from 'prop-types'
import { Loader, StatusMessage } from '@zooniverse/react-components'
import doCommitPasswordReset from '../../helpers/doCommitPasswordReset'
import DarkTealPrimaryButton from '../../../Unsubscribe/components/DarkTealPrimaryButton/DarkTealPrimaryButton'

function CommitResetForm ({
  resetPasswordToken = ''
}) {

  const { t } = useTranslation()
  const [isBusy, setIsBusy] = useState(false)
  const [apiError, setApiError] = useState(null)  // null, or Error object
  const [isComplete, setIsComplete] = useState(false)
  const inputPassword = useRef()  // New password
  const inputConfirmation = useRef()  // Confirm new password

  // This only triggers if the email is valid.
  // Email validation is performed via native HTML form controls.
  async function onSubmit () {
    // Prepare to submit!
    setIsBusy(true)
    setApiError(null)

    // Do the submit!
    const password = inputPassword.current?.value || ''
    const confirmation = inputConfirmation.current?.value || ''
    const submitError = await doCommitPasswordReset({
      password,
      confirmation,
      token: resetPasswordToken,
    })

    // Successful?
    setIsBusy(false)
    setApiError(submitError)
    setIsComplete(!submitError)
  }

  // Update StatusMessage
  let statusType = ''
  let statusText = ''
  if (apiError) {
    statusType = 'error'
    statusText = apiError.message?.toString() || apiError.toString?.()
    // ⚠️ TODO: check what kind of API errors are actually returned.

  } else if (isComplete) {
    statusType = 'success'
    statusText = t('ResetPassword.CommitResetForm.status.success')
  }

  return (
      <Form
        className='CommitResetForm'
        onSubmit={onSubmit}
      >
        <Heading
          level={1}
        >
          {t('ResetPassword.common.header')}
        </Heading>
        <Paragraph>
          {t('ResetPassword.CommitResetForm.body')}
        </Paragraph>
        <TextInput
          aria-label={t('ResetPassword.CommitResetForm.inputPassword')}
          disabled={isBusy || isComplete}
          ref={inputPassword}
          required
          type='password'
        />
        <TextInput
          aria-label={t('ResetPassword.CommitResetForm.inputConfirmation')}
          disabled={isBusy || isComplete}
          ref={inputConfirmation}
          required
          type='password'
        />
        <DarkTealPrimaryButton
          disabled={isBusy || isComplete}
          label={t('ResetPassword.CommitResetForm.submit')}
          type='submit'
        />
          
        {isBusy && <Loader />}

        <StatusMessage type={statusType} text={statusText} />

        {isComplete && <Paragraph>{t('ResetPassword.CommitResetForm.footer')}</Paragraph>}
      </Form>
  )
}

export default CommitResetForm