import { MetaToolsButton } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import PropTypes from 'prop-types'
import { FormView, FormViewHide } from 'grommet-icons'
import React from 'react'

import SHOWN_MARKS from '../../../../../../helpers/shownMarks'
import en from './locales/en'

counterpart.registerTranslations('en', en)

export default function HidePreviousMarksButton (props) {
  const { disabled, onClick, shownMarks } = props
  const icon = shownMarks === SHOWN_MARKS.NONE ? <FormViewHide /> : <FormView />
  const text = shownMarks === SHOWN_MARKS.NONE ?
    counterpart('HidePreviousMarksButton.show') :
    counterpart('HidePreviousMarksButton.hide')

  return (
    <MetaToolsButton
      aria-checked={shownMarks}
      disabled={disabled}
      icon={icon}
      role='checkbox'
      text={text}
      onClick={onClick}
    />
  )
}

HidePreviousMarksButton.propTypes = {
  disabled: PropTypes.bool,
  hidePreviousMarks: PropTypes.bool,
  onClick: PropTypes.func,
  shownMarks: PropTypes.number
}

HidePreviousMarksButton.defaultProps = {
  disabled: false,
  hidePreviousMarks: false,
  onClick: () => false,
  shownMarks: SHOWN_MARKS.ALL
}
