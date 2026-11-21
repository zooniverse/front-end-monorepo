import { Box, Text } from 'grommet'
import { Checkmark as PassIcon, FormClose as FailIcon } from 'grommet-icons'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

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

  svg {
    width: 0.75rem;
    height: 0.75rem;
  }

`

export default function EmailValidAndVerifiedStatus({ user }) {
  const { t } = useTranslation()

  if (!user) return null

  const isEmailValid = !!user?.valid_email;
  const isEmailVerified = !!user?.confirmed_at;

  return (
    <Box
      className='EmailValidAndVerifiedStatus'
    >
      <Box
        align='center'
        direction='row'
      >
        {isEmailValid ? (<>
          <IconContainer color='neutral-3'>
            <PassIcon color='neutral-6' />
          </IconContainer>
          <Text>
            {t('Settings.EmailSettings.emailValidAndVerifiedStatus.valid')}
          </Text>
        </>) : (<>
          <IconContainer color='neutral-4'>
            <PassIcon color='neutral-6' />
          </IconContainer>
          <Text>
            {t('Settings.EmailSettings.emailValidAndVerifiedStatus.invalid')}
          </Text>
        </>)}
      </Box>

      <Box
        align='center'
        direction='row'
      >
        {isEmailVerified ? (<>
          <IconContainer color='neutral-3'>
            <PassIcon color='neutral-6' />
          </IconContainer>
          <Text>
            {t('Settings.EmailSettings.emailValidAndVerifiedStatus.verified')}
          </Text>
        </>) : (<>
          <IconContainer color='neutral-4'>
            <PassIcon color='neutral-6' />
          </IconContainer>
          <Text>
            {t('Settings.EmailSettings.emailValidAndVerifiedStatus.unverified')}
          </Text>
        </>)}
      </Box>
    </Box>
  )
}