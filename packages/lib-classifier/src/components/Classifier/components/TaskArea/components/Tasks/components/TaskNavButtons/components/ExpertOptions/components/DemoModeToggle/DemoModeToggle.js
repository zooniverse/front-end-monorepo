import PropTypes from 'prop-types'
import React from 'react'
import { CheckBox } from 'grommet'
import { SpacedText } from '@zooniverse/react-components'
import { useTranslation } from '@translations/i18n'

export default function DemoModeToggle ({ demoMode, setDemoMode }) {
  const { t } = useTranslation('components')
  return (
    <CheckBox
      checked={demoMode}
      label={<SpacedText>{t('TaskArea.Tasks.ExpertOptions.demoToggle')}</SpacedText>}
      onChange={event => setDemoMode(event.target.checked)}
      toggle
    />
  )
}

DemoModeToggle.defaultProps = {
  demoMode: false,
  setDemoMode: () => { }
}

DemoModeToggle.propTypes = {
  demoMode: PropTypes.bool,
  setDemoMode: PropTypes.func
}
