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
const green = zooTheme.global.colors['status-ok']
// TODO move what makes sense into theme
export const StyledDoneButton = styled(Button)`
  background-color: ${theme('mode', {
    dark: zooTheme.global.colors.midDarkGrey,
    light: green
  })};
  border: ${theme('mode', {
    dark: `solid thin ${zooTheme.global.colors['dark-5']}`,
    light: `solid thin ${green}`
  })};
  color: white;
  cursor: pointer;
  flex: 3 0;
  font-size: 0.9em;
  padding: 0.9em;
  text-transform: capitalize;

  > i {
    margin-left: 1ch;
  }

  &:hover, &:focus {
    background: ${theme('mode', {
    dark: zooTheme.global.colors['neutral-1'],
    light: darken(0.15, green)
  })};
    border: ${theme('mode', {
    dark: `solid thin ${zooTheme.global.colors['dark-5']}`,
    light: `solid thin ${darken(0.15, green)}`
  })};
    color: 'white';
  }

  &:disabled {
    background: ${theme('mode', {
    dark: lighten(0.05, zooTheme.global.colors['dark-1']),
    light: lighten(0.05, green)
  })};
    border: ${theme('mode', {
    dark: `solid thin ${zooTheme.global.colors['dark-5']}`,
    light: `solid thin ${lighten(0.05, green)}`
  })};
    color: ${theme('mode', {
    dark: zooTheme.global.colors.text.dark,
    light: zooTheme.global.colors['light-1']
  })};
    cursor: not-allowed;
    opacity: 0.5;
  }
  `
// TODO add back gold standard and demo buttons using grommet Button icon prop
// {props.demoMode && <i className="fa fa-trash fa-fw" />}
// {props.goldStandardMode && <i className="fa fa-star fa-fw" />}
export function DoneButton (props) {
  if (!props.completed) {
    return (
      <ThemeProvider theme={{ mode: props.theme }}>
        <StyledDoneButton
          disabled={props.disabled}
          label={<Text size='small'>{counterpart('DoneButton.done')}</Text>}
          onClick={props.onClick}
          type='submit'
        />
      </ThemeProvider>
    )
  }

  return null
}

DoneButton.defaultProps = {
  completed: false,
  demoMode: false,
  disabled: false,
  goldStandardMode: false,
  onClick: () => {},
  theme: 'light'
}

DoneButton.propTypes = {
  completed: PropTypes.bool,
  demoMode: PropTypes.bool,
  disabled: PropTypes.bool,
  goldStandardMode: PropTypes.bool,
  onClick: PropTypes.func,
  theme: PropTypes.string
}

export default DoneButton
