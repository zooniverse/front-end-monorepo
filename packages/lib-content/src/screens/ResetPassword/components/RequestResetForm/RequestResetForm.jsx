import { useRef, useState } from 'react'
import { Form, Heading, Paragraph, TextInput } from 'grommet'
import { Trans, useTranslation } from '@translations/i18n'
import styled, { css } from 'styled-components'
import { bool } from 'prop-types'
import { Loader, StatusMessage } from '@zooniverse/react-components'
import doRequestPasswordReset from '../../helpers/doRequestPasswordReset'
import DarkTealPrimaryButton from '../../../Unsubscribe/components/DarkTealPrimaryButton/DarkTealPrimaryButton'

function RequestResetForm () {

const { t } = useTranslation()
  const [isBusy, setIsBusy] = useState(false)
  const [apiError, setApiError] = useState(null)  // null, or Error object
  const [isComplete, setIsComplete] = useState(false)
  const inputEmail = useRef()

  // This only triggers if the email is valid.
  // Email validation is performed via native HTML form controls.
  async function onSubmit () {
    // Prepare to submit!
    setIsBusy(true)
    setApiError(null)

    // Do the submit!
    const email = inputEmail.current?.value || ''
    const submitError = await doRequestPasswordReset({ email })

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
    statusText = t('ResetPassword.RequestResetForm.status.success')
  }

  return (
      <Form
        className='RequestResetForm'
        onSubmit={onSubmit}
      >
        <Heading
          level={1}
        >
          {t('ResetPassword.RequestResetForm.header')}
        </Heading>
        <Paragraph>
          {t('ResetPassword.RequestResetForm.body')}
        </Paragraph>
        <TextInput
          aria-label={t('ResetPassword.RequestResetForm.inputEmail')}
          disabled={isBusy || isComplete}
          ref={inputEmail}
          required
          type='email'
        />
        <DarkTealPrimaryButton
          disabled={isBusy || isComplete}
          label={t('ResetPassword.RequestResetForm.submit')}
          type='submit'
        />
          
        {isBusy && <Loader />}

        <StatusMessage type={statusType} text={statusText} />

        {isComplete && <Paragraph>{t('ResetPassword.RequestResetForm.footer')}</Paragraph>}
      </Form>
  )
}

export default RequestResetForm