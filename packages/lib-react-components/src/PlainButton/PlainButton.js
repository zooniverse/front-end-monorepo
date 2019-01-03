import React from 'react'
import PropTypes from 'prop-types'

import styled, { ThemeProvider } from 'styled-components'
import theme from 'styled-theming'

import { Button } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'
import SpacedText from '../SpacedText'

// TODO: why isn't styled-theming working?
function determineColor(theme) {
  return (theme === 'light') ?
    zooTheme.global.colors.darkTeal :
    zooTheme.global.colors.lightTeal
}

export const StyledPlainButton = styled(Button)`
  &:focus, &:hover {
    color: ${props => determineColor(props.theme)};
    text-decoration: underline;
  }
`

export default function PlainButton(props) {
  const { onClick, text, theme } = props
  const labelColor = determineColor(theme)

  return (
    <StyledPlainButton
      label={<SpacedText color={labelColor}>{text}</SpacedText>}
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
  onClick: PropTypes.func,
  label: PropTypes.string,
  theme: PropTypes.string
}
