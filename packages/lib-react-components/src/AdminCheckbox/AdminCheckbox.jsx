import { CheckBox } from 'grommet'
import { bool, func, oneOf } from 'prop-types'
import { ThemeProvider } from 'styled-components'
import { useTranslation } from '../translations/i18n'

import SpacedText from '../SpacedText'

const DEFAULT_HANDLER = () => {}

function Label () {
  const { t } = useTranslation()

  return (
    <SpacedText weight='bold'>
      {t('AdminCheckbox.label')}
    </SpacedText>
  )
}

export default function AdminCheckbox ({ checked = false, colorTheme = 'light', onChange = DEFAULT_HANDLER }) {
  return (
    <ThemeProvider theme={{ mode: colorTheme }}>
      <CheckBox
        checked={checked}
        id='admin-checkbox'
        name='admin-checkbox'
        label={<Label />}
        onChange={onChange}
        toggle
      />
    </ThemeProvider>
  )
}

AdminCheckbox.propTypes = {
  checked: bool,
  colorTheme: oneOf(['light', 'dark']),
  onChange: func
}
