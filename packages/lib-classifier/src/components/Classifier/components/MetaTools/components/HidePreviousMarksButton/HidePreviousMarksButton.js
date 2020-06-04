import { MetaToolsButton } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import PropTypes from 'prop-types'
import { FormView, FormViewHide, Hide } from 'grommet-icons'
import React from 'react'

import SHOWN_MARKS from '@helpers/shownMarks'
import en from './locales/en'

counterpart.registerTranslations('en', en)

export default function HidePreviousMarksButton (props) {
  const { disabled, onClick, shownMarks } = props
  const text = shownMarks === SHOWN_MARKS.ALL ?
    counterpart('HidePreviousMarksDrawingButton.hide') :
    counterpart('HidePreviousMarksDrawingButton.show')

  const icon = shownMarks === SHOWN_MARKS.ALL ? <FormView /> : <FormViewHide />

  return (
    <MetaToolsButton
      aria-checked={shownMarks === SHOWN_MARKS.NONE}
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
  onClick: PropTypes.func,
  shownMarks: PropTypes.string
}

HidePreviousMarksButton.defaultProps = {
  disabled: false,
  onClick: () => false,
  shownMarks: SHOWN_MARKS.ALL
}
