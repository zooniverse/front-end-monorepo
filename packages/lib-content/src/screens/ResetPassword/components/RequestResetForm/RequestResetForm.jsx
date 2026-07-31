import { useRef, useState } from 'react'
import { Anchor, Box, Form, FormField, Heading, Paragraph, TextInput } from 'grommet'
import { Trans, useTranslation } from '@translations/i18n'
import styled, { css } from 'styled-components'
import { bool } from 'prop-types'
import { Loader, StatusMessage } from '@zooniverse/react-components'
import doRequestPasswordReset from '../../helpers/doRequestPasswordReset'
import DarkTealPrimaryButton from '../../../Unsubscribe/components/DarkTealPrimaryButton/DarkTealPrimaryButton'

function RequestResetForm () {

  const { t } = useTranslation()
  const [isBusy, setIsBusy] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const inputEmail = useRef()

  // This only triggers if the email is valid.
  // Email validation is performed via native HTML form controls.
  async function onSubmit () {
    // Prepare to submit!
    setIsBusy(true)
    setIsError(false)

    // Do the submit!
    const email = inputEmail.current?.value || ''
    const success = await doRequestPasswordReset({ email })

    // Successful?
    setIsBusy(false)
    setIsError(!success)
    setIsComplete(success)
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
          disabled={isBusy}
          ref={inputEmail}
          required
          type='email'
        />
        <DarkTealPrimaryButton
          disabled={isBusy}
          label={t('ResetPassword.RequestResetForm.submit')}
          type='submit'
        />
          
        {isBusy && <Loader />}

        <StatusMessage type='success' text='TODO' />
      </Form>
  )
}

export default RequestResetForm