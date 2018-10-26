import React from 'react'
import PropTypes from 'prop-types'

import { CheckBox, Text } from 'grommet'
import styled, { ThemeProvider } from 'styled-components'
import theme from 'styled-theming'
import zooTheme from '@zooniverse/grommet-theme'

import counterpart from 'counterpart'
import en from './locales/en'

counterpart.registerTranslations('en', en)

const StyledText = styled(Text)`
  color: ${theme('mode', {
    dark: zooTheme.global.colors.darkBackground.text,
    light: zooTheme.global.colors.lightBackground.text
  })}
`

function AdminCheckbox ({ checked, colorTheme, label, onChange, theme }) {
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
};

AdminCheckbox.defaultProps = {
  checked: false,
  colorTheme: 'light',
  label: <StyledText>{counterpart('AdminCheckbox.label')}</StyledText>,
  onChange: () => {},
}

AdminCheckbox.propTypes = {
  checked: PropTypes.bool,
  colorTheme: PropTypes.oneOf(['light', 'dark']),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onChange: PropTypes.func,
}

export default AdminCheckbox
