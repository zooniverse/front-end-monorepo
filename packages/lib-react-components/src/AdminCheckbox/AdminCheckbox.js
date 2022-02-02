import { CheckBox } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { useTranslation } from 'react-i18next'
import '../translations/i18n'

import SpacedText from '../SpacedText'

export default function AdminCheckbox ({ checked, colorTheme, label, onChange }) {
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
  onChange: () => {}
}

AdminCheckbox.propTypes = {
  checked: PropTypes.bool,
  colorTheme: PropTypes.oneOf(['light', 'dark']),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onChange: PropTypes.func
}

function Label () {
  const { t } = useTranslation()

  return (
    <SpacedText weight='bold'>
      {t('AdminCheckbox.label')}
    </SpacedText>
  )
}
