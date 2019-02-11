import zooTheme from '@zooniverse/grommet-theme'
import counterpart from 'counterpart'
import { CheckBox, Text } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import theme from 'styled-theming'

import en from './locales/en'
import SpacedText from '../SpacedText'

counterpart.registerTranslations('en', en)

const StyledText = styled(Text)`
  color: ${theme('mode', {
    dark: zooTheme.global.colors.darkBackground.text,
    light: zooTheme.global.colors.lightBackground.text
  })}
`

export default function AdminCheckbox ({ checked, colorTheme, label, onChange, theme }) {
  return (
    <ThemeProvider theme={{ mode: colorTheme }}>
      <CheckBox
        checked={checked}
        id='admin-checkbox'
        name='admin-checkbox'
        label={label}
        onChange={onChange}
        toggle
      />
    </ThemeProvider>
  )
}

AdminCheckbox.defaultProps = {
  checked: false,
  colorTheme: 'light',
  label: <Label />,
  onChange: () => {},
}

AdminCheckbox.propTypes = {
  checked: PropTypes.bool,
  colorTheme: PropTypes.oneOf(['light', 'dark']),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onChange: PropTypes.func,
}

function Label () {
  return (
    <SpacedText weight='bold'>
      {counterpart('AdminCheckbox.label')}
    </SpacedText>
  )
}
