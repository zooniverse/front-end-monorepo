import { useId, useRef, useState } from 'react'
import { Box, Form, FormField, Heading, Paragraph, TextInput } from 'grommet'
import { useTranslation } from '@translations/i18n'
import styled, { css } from 'styled-components'
import { bool } from 'prop-types'
import { Loader, StatusMessage } from '@zooniverse/react-components'
import ResetPasswordHeader from '../ResetPasswordHeader/ResetPasswordHeader'
import doCommitPasswordReset from '../../helpers/doCommitPasswordReset'
import DarkTealPrimaryButton from '../../../Unsubscribe/components/DarkTealPrimaryButton/DarkTealPrimaryButton'

const InputBoxes = styled(Box)`
  gap: 1em;
`

const InputBox = styled(Box)`
  gap: 0.5em;
`

const InputLabelBox = styled(Box)`
  gap: 0.5em;
`

const HelpInfo = styled('span')`

`

function CommitResetForm ({
  resetPasswordToken = ''
}) {

  const { t } = useTranslation()
  const [isBusy, setIsBusy] = useState(false)
  const [apiError, setApiError] = useState(null)  // null, or Error object
  const [isComplete, setIsComplete] = useState(false)
  const inputPassword = useRef()  // New password
  const inputConfirmation = useRef()  // Confirm new password

  const passwordInputId = useId()
  const confirmationInputId = useId()

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

  } else if (isComplete) {
    statusType = 'success'
    statusText = t('ResetPassword.CommitResetForm.status.success')
  }

  return (
      <Form
        className='CommitResetForm'
        onSubmit={onSubmit}
      >
        <ResetPasswordHeader />

        <Paragraph>
          {t('ResetPassword.CommitResetForm.body')}
        </Paragraph>

        <InputBoxes>

          <InputBox>
            <InputLabelBox direction='row'>
              <label for={passwordInputId}>{t('ResetPassword.CommitResetForm.inputPassword')}</label>
              <HelpInfo>{t('ResetPassword.CommitResetForm.helpInfoPassword')}</HelpInfo>
            </InputLabelBox>
            <TextInput
              id={passwordInputId}
              disabled={isBusy || isComplete}
              ref={inputPassword}
              required
              type='password'
            />
          </InputBox>

          <InputBox>
            <InputLabelBox direction='row'>
              <label for={confirmationInputId}>{t('ResetPassword.CommitResetForm.inputConfirmation')}</label>
              <HelpInfo>{t('ResetPassword.CommitResetForm.helpInfoConfirmation')}</HelpInfo>
            </InputLabelBox>
            <TextInput
              id={confirmationInputId}
              disabled={isBusy || isComplete}
              ref={inputConfirmation}
              required
              type='password'
            />
          </InputBox>

          <Box direction='row' justify='end'>
            <DarkTealPrimaryButton
              disabled={isBusy || isComplete}
              label={t('ResetPassword.CommitResetForm.submit')}
              type='submit'
            />
          </Box>

          {isBusy && <Loader />}

          <StatusMessage type={statusType} text={statusText} />

          {isComplete && <Paragraph>{t('ResetPassword.CommitResetForm.footer')}</Paragraph>}

        </InputBoxes>          
      </Form>
  )
}

export default CommitResetForm