import { useId, useRef, useState } from 'react'
import { Box, Form, Heading, Paragraph, TextInput } from 'grommet'
import { useTranslation } from '@translations/i18n'
import styled, { css } from 'styled-components'
import { bool } from 'prop-types'
import { Loader, StatusMessage } from '@zooniverse/react-components'
import ResetPasswordHeading from '../ResetPasswordHeading/ResetPasswordHeading'
import doRequestPasswordReset from '../../helpers/doRequestPasswordReset'
import DarkTealPrimaryButton from '../../../Unsubscribe/components/DarkTealPrimaryButton/DarkTealPrimaryButton'

const InputBoxes = styled(Box)`
  gap: 1em;

  input:user-invalid {
    border-color: ${props => props.theme.global.colors['neutral-4']};
  }
`

const VisuallyHiddenLabel = styled('label')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

function RequestResetForm () {

  const { t } = useTranslation()
  const [isBusy, setIsBusy] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [apiError, setApiError] = useState(null)  // null, or Error object
  const inputEmail = useRef()
  const inputEmailId = useId()

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

    if (apiError.status === 429) {  // Special case: too many requests to reset the same email address
      statusText = t('ResetPassword.RequestResetForm.status.errorTooManyRequests')
    }

  } else if (isComplete) {
    statusType = 'success'
    statusText = t('ResetPassword.RequestResetForm.status.success')
  }

  return (
      <Form
        className='RequestResetForm'
        onSubmit={onSubmit}
      >
        <ResetPasswordHeading />

        <Paragraph>
          {t('ResetPassword.RequestResetForm.body')}
        </Paragraph>

        <InputBoxes>

          <VisuallyHiddenLabel htmlFor={inputEmailId}>
            {t('ResetPassword.RequestResetForm.inputEmail')}
          </VisuallyHiddenLabel>
        
          <TextInput
            aria-label={t('ResetPassword.RequestResetForm.inputEmail')}
            disabled={isBusy || isComplete}
            id={inputEmailId}
            name='email'
            ref={inputEmail}
            required
            type='email'
          />
          
          <Box direction='row' justify='end'>
            <DarkTealPrimaryButton
              disabled={isBusy || isComplete}
              label={t('ResetPassword.RequestResetForm.submit')}
              type='submit'
            />
          </Box>
            
          {isBusy && <Box align='center'><Loader /></Box>}

          <StatusMessage type={statusType} text={statusText} />

          {isComplete && <Paragraph>{t('ResetPassword.RequestResetForm.footer')}</Paragraph>}
        </InputBoxes>
      </Form>
  )
}

export default RequestResetForm