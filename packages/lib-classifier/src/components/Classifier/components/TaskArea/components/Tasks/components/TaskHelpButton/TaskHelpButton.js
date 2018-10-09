import React from 'react'
import PropTypes from 'prop-types'

import styled, { ThemeProvider } from 'styled-components'
import theme from 'styled-theming'
// import Translate from 'react-translate-component'
import { Button } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'
import { pxToRem } from '../../../../../helpers'

export const StyledTaskHelpButton = styled(Button)`
  background-color: transparent;
  border: none;
  color: ${theme('mode', {
    dark: zooTheme.global.colors.lightTeal,
    light: zooTheme.global.colors.darkTeal
  })};
  cursor: pointer;
  display: inline-block;
  font-size: ${pxToRem(14)};
  letter-spacing: ${pxToRem(1)};
  margin-top: ${pxToRem(20)};
  text-align: center;
  text-transform: uppercase;
  width: 100%;

  &:focus, &:hover {
    text-decoration: underline;
  }
`

export function TaskHelpButton(props) {
  return (
    <ThemeProvider theme={{ mode: props.theme }}>
      <StyledTaskHelpButton
        label="need some help with this task?"
        onClick={props.onClick}
        plain={true}
      />
    </ThemeProvider>
  )
}

TaskHelpButton.defaultProps = {
  onClick: () => { },
  theme: 'light'
}

TaskHelpButton.propTypes = {
  onClick: PropTypes.func,
  theme: PropTypes.string
}


export default TaskHelpButton
