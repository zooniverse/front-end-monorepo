import { useId, useRef, useState } from 'react'
import { Box, Form, Heading, Paragraph, TextInput } from 'grommet'
import { useTranslation } from '@translations/i18n'
import styled, { css } from 'styled-components'
import { string } from 'prop-types'

import { Loader, StatusMessage } from '@zooniverse/react-components'
import ResetPasswordHeading from '../ResetPasswordHeading/ResetPasswordHeading'
import doCommitPasswordReset from '../../helpers/doCommitPasswordReset.js'
import isNewPasswordValid from '../../helpers/isNewPasswordValid.js'
import DarkTealPrimaryButton from '../../../Unsubscribe/components/DarkTealPrimaryButton/DarkTealPrimaryButton'

const InputBoxes = styled(Box)`
  gap: 1em;
`

const InputBox = styled(Box)`
  gap: 0.5em;

  input:user-invalid {
    border-color: ${props => props.theme.global.colors['neutral-4']};
  }
`

const InputLabelBox = styled(Box)`
  align-items: baseline;
  gap: 0.5em;
`

const HelpInfo = styled('span')`
  ${props => props.theme.dark
    ? css`color: ${props.theme.global.colors['dark-4']}`
    : css`color: ${props.theme.global.colors['light-2']}`
  }
  font-weight: 300;
  font-size: 0.6666666667em;
  line-height: 1em;
`

// This needs to be synced with the message in en.json
const MINIMUM_PASSWORD_LENGTH = 8
const PASSWORD_PATTERN = `.{${MINIMUM_PASSWORD_LENGTH},}`

function CommitResetForm ({
  resetPasswordToken = ''
}) {

  const { t } = useTranslation()
  const [isBusy, setIsBusy] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [inputError, setInputError] = useState(null)  // null, or Error object
  const [apiError, setApiError] = useState(null)  // null, or Error object
  const inputPassword = useRef()  // New password
  const inputConfirmation = useRef()  // Confirm new password

  const passwordInputId = useId()
  const passwordHelpId = useId()
  const confirmationInputId = useId()
  const confirmationHelpId = useId()

  // This only triggers if the email is valid.
  // Email validation is performed via native HTML form controls.
  async function onSubmit () {
    const password = inputPassword.current?.value || ''
    const confirmation = inputConfirmation.current?.value || ''

    // Check input
    const preSubmitError = isNewPasswordValid(password, confirmation, t)
    setInputError(preSubmitError || null)  // If new password is valid, preSubmitError is 0
    if (preSubmitError) return

    // Prepare to submit!
    setIsBusy(true)
    setApiError(null)

    // Do the submit!
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

  } else if (inputError) {
    statusType = 'error'
    statusText = inputError.message?.toString() || inputError.toString?.()

  } else if (isComplete) {
    statusType = 'success'
    statusText = t('ResetPassword.CommitResetForm.status.success')
  }

  return (
      <Form
        className='CommitResetForm'
        onSubmit={onSubmit}
      >
        <ResetPasswordHeading />

        <Paragraph>
          {t('ResetPassword.CommitResetForm.body')}
        </Paragraph>

        <InputBoxes>

          <InputBox>
            <InputLabelBox direction='row'>
              <label for={passwordInputId}>{t('ResetPassword.CommitResetForm.inputPassword')}</label>
              <HelpInfo id={passwordHelpId}>{t('ResetPassword.CommitResetForm.infoPassword')}</HelpInfo>
            </InputLabelBox>
            <TextInput
              aria-describedby={passwordHelpId}
              id={passwordInputId}
              disabled={isBusy || isComplete}
              name='password'
              pattern={PASSWORD_PATTERN}
              ref={inputPassword}
              required
              title={t('ResetPassword.CommitResetForm.titleForInputPattern')}
              type='password'
            />
          </InputBox>

          <InputBox>
            <InputLabelBox direction='row'>
              <label for={confirmationInputId}>{t('ResetPassword.CommitResetForm.inputConfirmation')}</label>
              <HelpInfo id={confirmationHelpId}>{t('ResetPassword.CommitResetForm.infoConfirmation')}</HelpInfo>
            </InputLabelBox>
            <TextInput
              aria-describedby={confirmationHelpId}
              id={confirmationInputId}
              disabled={isBusy || isComplete}
              name='confirmation'
              pattern={PASSWORD_PATTERN}
              ref={inputConfirmation}
              required
              title={t('ResetPassword.CommitResetForm.titleForInputPattern')}
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

          {isBusy && <Box align='center'><Loader /></Box>}

          <StatusMessage type={statusType} text={statusText} />

        </InputBoxes>          
      </Form>
  )
}

CommitResetForm.propTypes = {
  resetPasswordToken: string,
}

export default CommitResetForm