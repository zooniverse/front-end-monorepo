import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button } from 'grommet'
import counterpart from 'counterpart'
import zooTheme from '@zooniverse/grommet-theme'
import en from './locales/en'
import SpacedText from '../../../SpacedText'

counterpart.registerTranslations('en', en)

const StyledSignInButton = styled(Button)`
  border-bottom: 2px solid transparent;

  &:hover, &:focus {
    border-bottom-color: ${zooTheme.global.colors.teal};
  }
`

export function SignInButtonLabel () {
  return (
    <SpacedText color="#B2B2B2" weight="bold" size="xsmall">
      {counterpart('SignInButton.label')}
    </SpacedText>
  )
}

export default function SignInButton ({ onClick }) {
  return (
    <StyledSignInButton
      label={<SignInButtonLabel />}
      plain={true}
      onClick={onClick}
    />
  )
}

SignInButton.propTypes = {
  onClick: PropTypes.func.isRequired
}