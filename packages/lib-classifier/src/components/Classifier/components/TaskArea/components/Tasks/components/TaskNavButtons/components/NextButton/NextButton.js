import React from 'react'
import PropTypes from 'prop-types'
import styled, { ThemeProvider } from 'styled-components'
import theme from 'styled-theming'
import { adjustHue } from 'polished'
import counterpart from 'counterpart'
import { Button, Text } from 'grommet'
import { FormNextLink } from 'grommet-icons'
import zooTheme from '@zooniverse/grommet-theme'
import en from './locales/en'

counterpart.registerTranslations('en', en)

const gold = zooTheme.global.colors['neutral-4']

// TODO: box-shadow, border-radius, and disabled likely can move into the grommet theme.
export const StyledNextButton = styled(Button)`
  background: ${theme('mode', {
    dark: zooTheme.global.colors['dark-1'],
    light: gold
  })};
  border: ${theme('mode', {
    dark: `solid thin ${gold}`,
    light: `solid thin ${gold}`
  })};
  border-radius: 0;
  box-shadow: none;
  color: ${theme('mode', {
    dark: gold,
    light: 'black'
  })};
  flex: 3 0 auto;
  padding: 0.5em;
  text-transform: capitalize;

  svg {
    fill: ${theme('mode', {
    dark: gold,
    light: 'black'
  })};
    stroke: ${theme('mode', {
    dark: gold,
    light: 'black'
  })};
  }

  &:hover:not(:disabled), &:focus:not(:disabled) {
    background: ${theme('mode', {
    dark: gold,
    light: adjustHue(-7, gold)
  })};
    border: ${theme('mode', {
    dark: `solid thin ${gold}`,
    light: `solid thin ${adjustHue(-7, gold)}`
  })};
    box-shadow: none;
    color: ${theme('mode', {
    dark: 'black',
    light: 'black'
  })};
  }

  &:disabled {
    cursor: not-allowed;
  }
  `

function NextButton ({ autoFocus, disabled, classifierTheme, onClick }) {
  return (
    <ThemeProvider theme={{ mode: classifierTheme }}>
      <StyledNextButton
        autoFocus={autoFocus}
        color={gold}
        disabled={disabled}
        icon={<FormNextLink size='small' />}
        label={<Text size='small'>{counterpart('NextButton.next')}</Text>}
        onClick={(disabled) ? null : onClick}
        reverse
        type='button'
      />
    </ThemeProvider>
  )
}

NextButton.defaultProps = {
  autoFocus: false,
  classifierTheme: 'light',
  disabled: false
}

NextButton.propTypes = {
  autoFocus: PropTypes.bool,
  classifierTheme: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired
}

export default NextButton
