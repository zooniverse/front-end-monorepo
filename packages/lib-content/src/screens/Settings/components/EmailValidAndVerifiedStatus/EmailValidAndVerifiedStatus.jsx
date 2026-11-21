import { useState } from 'react'
import { Box, Button, Text } from 'grommet'
import { Checkmark as PassIcon, FormClose as FailIcon } from 'grommet-icons'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import requestVerificationEmail from '../../helpers/requestVerificationEmail'

// Dev note: this is a "dev design", and should receive a design review when possible.
const RequestButton = styled(Button)`
  color: ${props => props.theme.dark ? props.theme.global.colors['neutral-6'] : props.theme.global.colors['neutral-7']};
  border-color: ${props => props.theme.dark ? props.theme.global.colors['accent-1'] : props.theme.global.colors['neutral-1']};
  border-style: solid;
  border-radius: 0.25rem;
  border-width: 0.5px;
  font-size: 0.875rem;
  padding: 0 0.5rem;
`

const StatusContainer = styled(Box)`
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
`

const IconContainer = styled.div`
  width: 1rem;
  height: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  background: ${props => props.theme.global.colors[props.color]};
  border-radius: 0.5rem;
`

export default function EmailValidAndVerifiedStatus({ user }) {
  const { t } = useTranslation()
  const [ isRequesting, setIsRequesting ] = useState(false)  // Are we in the process of requesting a verification email?
  const [ requestSuccess, setRequestSuccess ] = useState(false)  // Was the verification email request successful?
  const [ requestError, setRequestError ] = useState(null)  // If the reverification email request failed, this is the error object.

  async function doRequestVerificationEmail () {
    try {
      setIsRequesting(true)
      setRequestSuccess(false)
      setRequestError(null)

      await requestVerificationEmail(user?.email)

      setIsRequesting(false)
      setRequestSuccess(true)

    } catch (err) {
      console.error(err)
      setIsRequesting(false)
      setRequestSuccess(false)
      setRequestError(err)
    }
  }

  if (!user) return null

  const isEmailValid = !!user?.valid_email
  const isEmailVerified = !!user?.confirmed_at

  const disableRequestButton = isRequesting
  const requestMessage =
    isRequesting ? t('Settings.EmailSettings.emailValidAndVerifiedStatus.unverifiedRequesting')
    : requestSuccess ? t('Settings.EmailSettings.emailValidAndVerifiedStatus.unverifiedSuccess')
    : requestError ? t('Settings.EmailSettings.emailValidAndVerifiedStatus.unverifiedError')
    : ''

  return (
    <Box
      className='EmailValidAndVerifiedStatus'
      margin={{ bottom: '-20px' }}
    >
      <StatusContainer>
        {isEmailValid ? (
          <>
            <PassStatus />
            <Text size='0.875rem'>
              {t('Settings.EmailSettings.emailValidAndVerifiedStatus.valid')}
            </Text>
          </>
        ) : (
          <>
            <FailStatus />
            <Text size='0.875rem'>
              {t('Settings.EmailSettings.emailValidAndVerifiedStatus.invalid')}
            </Text>
          </>
        )}
      </StatusContainer>

      <StatusContainer>
        {isEmailVerified ? (
          <>
            <PassStatus />
            <Text size='0.875rem'>
              {t('Settings.EmailSettings.emailValidAndVerifiedStatus.verified')}
            </Text>
          </>
        ) : (
          <>
            <FailStatus />
            <Text size='0.875rem'>
              {t('Settings.EmailSettings.emailValidAndVerifiedStatus.unverified')}
            </Text>
            <RequestButton
              disabled={disableRequestButton}
              onClick={doRequestVerificationEmail}
            >
              {t('Settings.EmailSettings.emailValidAndVerifiedStatus.unverifiedPrompt')}
            </RequestButton>
            <Text
              as='output'
              aria-live='polite'
            >
              {requestMessage}
            </Text>
          </>
        )}
      </StatusContainer>
    </Box>
  )
}

const PassStatus = () => (
  <IconContainer color='neutral-3'>
    <PassIcon size='0.5rem' color='neutral-6' />
  </IconContainer>
)

const FailStatus = () => (
  <IconContainer color='neutral-4'>
    <FailIcon size='0.75rem' color='neutral-6' />
  </IconContainer>
)