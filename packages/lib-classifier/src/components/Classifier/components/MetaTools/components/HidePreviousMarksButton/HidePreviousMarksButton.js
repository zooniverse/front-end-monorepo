import { MetaToolsButton } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import PropTypes from 'prop-types'
import { FormView } from 'grommet-icons'
import React from 'react'

import en from './locales/en'

counterpart.registerTranslations('en', en)

export default function HidePreviousMarksButton (props) {
  const { disabled, onClick } = props
  return (
    <MetaToolsButton
      disabled={disabled}
      icon={<FormView />}
      text={counterpart('HidePreviousMarksButton.hide')}
      onClick={onClick}
    />
  )
}

HidePreviousMarksButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func
}

HidePreviousMarksButton.defaultProps = {
  disabled: false,
  onClick: () => false
}
