import { MetaToolsButton } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import PropTypes from 'prop-types'
import { FormView, FormViewHide } from 'grommet-icons'
import React from 'react'

import en from './locales/en'

counterpart.registerTranslations('en', en)

export default function HidePreviousMarksButton (props) {
  const { disabled, hidePreviousMarks, onClick } = props
  const icon = hidePreviousMarks ? <FormViewHide /> : <FormView />
  const text = hidePreviousMarks ?
    counterpart('HidePreviousMarksButton.show') :
    counterpart('HidePreviousMarksButton.hide')

  return (
    <MetaToolsButton
      disabled={disabled}
      icon={icon}
      text={text}
      onClick={onClick}
    />
  )
}

HidePreviousMarksButton.propTypes = {
  disabled: PropTypes.bool,
  hidePreviousMarks: PropTypes.bool,
  onClick: PropTypes.func
}

HidePreviousMarksButton.defaultProps = {
  disabled: false,
  hidePreviousMarks: false,
  onClick: () => false
}
