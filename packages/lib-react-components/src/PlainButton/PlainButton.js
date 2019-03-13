import { withKnobs, text } from '@storybook/addon-knobs'
import zooTheme from '@zooniverse/grommet-theme'
import { Button } from 'grommet'
import { func, string } from 'prop-types'
import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import theme from 'styled-theming'

import SpacedText from '../SpacedText'

// TODO: why isn't styled-theming working?
function determineColor(theme) {
  return (theme === 'light')
    ? zooTheme.global.colors['neutral-2']
    : zooTheme.global.colors['accent-2']
}

export const StyledPlainButton = styled(Button)`
  &:focus,
  &:hover {
    color: ${props => determineColor(props.theme)};
    text-decoration: underline;
  }
`

export default function PlainButton (props) {
  const { onClick, text, theme } = props
  const labelColor = determineColor(theme)

  return (
    <StyledPlainButton
      label={(
        <SpacedText color={labelColor}>
          {text}
        </SpacedText>
      )}
      onClick={onClick}
      plain
      {...props}
    />
  )
}

PlainButton.defaultProps = {
  theme: 'light'
}

PlainButton.propTypes = {
  onClick: func,
  label: string,
  theme: string
}
