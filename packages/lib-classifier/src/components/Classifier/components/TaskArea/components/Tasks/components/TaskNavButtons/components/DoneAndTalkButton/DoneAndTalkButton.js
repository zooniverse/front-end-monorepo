import React from 'react'
import PropTypes from 'prop-types'
import { Button, Text } from 'grommet'
import styled, { ThemeProvider } from 'styled-components'
import theme from 'styled-theming'
import { darken, lighten } from 'polished'
import zooTheme from '@zooniverse/grommet-theme'
import counterpart from 'counterpart'
import en from './locales/en'

counterpart.registerTranslations('en', en)

// Taken from PFE on 2019.02.28; these colours aren't part of the current theme.
const TALK_LINK_BLUE = '#43bbfd';
const TALK_LINK_BLUE_HOVER = '#69c9fd';
const TALK_LINK_BLUE_HOVER_DARK = '#104A79';

// TODO move what makes sense into theme
export const StyledDoneAndTalkButton = styled(Button)`
  background-color: ${theme('mode', {
    dark: zooTheme.global.colors.midDarkGrey,
    light: TALK_LINK_BLUE
  })};
  border: ${theme('mode', {
    dark: `solid thin ${TALK_LINK_BLUE}`,
    light: `solid thin transparent`
  })};
  border-radius: 0;
  color: white;
  cursor: pointer;
  flex: 3 0;
  font-size: 0.9em;
  padding: 0.9em;
  text-transform: capitalize;

  > i {
    margin-left: 1ch;
    margin-right: 1ch;
  }

  &:hover, &:focus {
    background: ${theme('mode', {
      dark: TALK_LINK_BLUE_HOVER_DARK,
      light: darken(0.25, TALK_LINK_BLUE_HOVER)
    })};
    border: ${theme('mode', {
      dark: `solid thin ${TALK_LINK_BLUE}`,
      light: `solid thin ${darken(0.15, zooTheme.light.colors.button.done)}`
    })};
    color: ${theme('mode', {
      dark: zooTheme.dark.colors.font,
      light: `white`
    })};
  }

  &:disabled {
    background: ${theme('mode', {
      dark: lighten(0.05, zooTheme.global.colors.midDarkGrey),
      light: lighten(0.05, TALK_LINK_BLUE)
    })};
    border: ${theme('mode', {
      dark: `solid thin ${TALK_LINK_BLUE}`,
      light: `solid thin transparent`
    })};
    color: ${theme('mode', {
      dark: zooTheme.dark.colors.font,
      light: '#EEF1F4'
    })};
    cursor: not-allowed;
    opacity: 0.5;
  }
  `

export const StyledDisabledTalkPlaceholder = styled.span`
  background: ${theme('mode', {
    dark: zooTheme.dark.colors.background.default,
    light: TALK_LINK_BLUE
  })};
  border: ${theme('mode', {
    dark: `thin solid ${TALK_LINK_BLUE}`,
    light: 'thin solid transparent'
  })};
  color: ${theme('mode', {
    dark: zooTheme.dark.colors.font,
    light: 'white'
  })};
  cursor: not-allowed;
  opacity: 0.5;
  `

export function DoneAndTalkButton (props) {
  if (props.disabled) {
    return (
      <ThemeProvider theme={{ mode: props.theme }}>
        <StyledDisabledTalkPlaceholder>
          <Text size='small'>{counterpart('DoneAndTalkButton.doneAndTalk')}</Text>
        </StyledDisabledTalkPlaceholder>
      </ThemeProvider>
    )
  }
  
  if (!props.completed) {
    return (
      <ThemeProvider theme={{ mode: props.theme }}>
        <StyledDoneAndTalkButton
          disabled={props.disabled}
          label={<Text size='small'>{counterpart('DoneAndTalkButton.doneAndTalk')}</Text>}
          onClick={props.onClick}
          type='submit'
        />
      </ThemeProvider>
    )
  }

  return null
}

DoneAndTalkButton.defaultProps = {
  completed: false,
  demoMode: false,
  disabled: false,
  goldStandardMode: false,
  onClick: () => {},
  theme: 'light'
}

DoneAndTalkButton.propTypes = {
  completed: PropTypes.bool,
  demoMode: PropTypes.bool,
  disabled: PropTypes.bool,
  goldStandardMode: PropTypes.bool,
  onClick: PropTypes.func,
  theme: PropTypes.string
}

export default DoneAndTalkButton
