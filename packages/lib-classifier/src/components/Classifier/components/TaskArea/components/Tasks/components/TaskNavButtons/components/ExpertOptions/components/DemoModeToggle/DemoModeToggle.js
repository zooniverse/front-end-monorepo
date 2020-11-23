import PropTypes from 'prop-types'
import React from 'react'
import { CheckBox } from 'grommet'
import { SpacedText } from '@zooniverse/react-components'
import counterpart from 'counterpart';
import en from './locales/en'

counterpart.registerTranslations('en', en)

export default function DemoModeToggle ({ demoMode, setDemoMode }) {
  return (
    <CheckBox
      checked={demoMode}
      label={<SpacedText>{counterpart('DemoModeToggle.label')}</SpacedText>}
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
};