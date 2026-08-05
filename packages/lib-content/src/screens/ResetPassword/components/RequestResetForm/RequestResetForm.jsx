import { useRef, useState } from 'react'
import { Box, Form, Heading, Paragraph, TextInput } from 'grommet'
import { Trans, useTranslation } from '@translations/i18n'
import styled, { css } from 'styled-components'
import { bool } from 'prop-types'
import { Loader, StatusMessage } from '@zooniverse/react-components'
import doRequestPasswordReset from '../../helpers/doRequestPasswordReset'
import DarkTealPrimaryButton from '../../../Unsubscribe/components/DarkTealPrimaryButton/DarkTealPrimaryButton'

const DecoDivider = styled('div')`
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #A6A7A9 49.62%, rgba(255, 255, 255, 0) 100%);
`

const InputBoxes = styled(Box)`
  gap: 1em;
`

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
        <Heading
          color={{ light: 'neutral-1', dark: 'accent-1' }}
          level={1}
          textAlign='center'
        >
          {t('ResetPassword.common.header')}
        </Heading>

        <DecoDivider />

        <Paragraph>
          {t('ResetPassword.RequestResetForm.body')}
        </Paragraph>

        <InputBoxes>
        
          <TextInput
            aria-label={t('ResetPassword.RequestResetForm.inputEmail')}
            disabled={isBusy || isComplete}
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
            
          {isBusy && <Loader />}

          <StatusMessage type={statusType} text={statusText} />

          {isComplete && <Paragraph>{t('ResetPassword.RequestResetForm.footer')}</Paragraph>}
        </InputBoxes>
      </Form>
  )
}

export default RequestResetForm