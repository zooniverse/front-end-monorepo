import { MetaToolsButton } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import PropTypes from 'prop-types'
import { FormView, FormViewHide, Hide } from 'grommet-icons'
import React from 'react'

import SHOWN_MARKS from '../../../../../../helpers/shownMarks'
import en from './locales/en'

counterpart.registerTranslations('en', en)

export default function HidePreviousMarksButton (props) {
  const { disabled, onClick, shownMarks, type } = props
  let text, icon;
  const isDrawingTask = type === 'drawing'

  switch(shownMarks) {
    case SHOWN_MARKS.ALL:
      text = isDrawingTask ? counterpart('HidePreviousMarksDrawingButton.hide')
        : counterpart('HidePreviousMarksTranscriptionButton.showUser')
      icon = <FormView />
      break;
    case SHOWN_MARKS.USER:
      text = counterpart('HidePreviousMarksTranscriptionButton.hide')
      icon = <Hide />
      break;
    default:
      text = isDrawingTask ? counterpart('HidePreviousMarksDrawingButton.show')
        : counterpart('HidePreviousMarksTranscriptionButton.show')
      icon = <FormViewHide />
  }

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
  onClick: PropTypes.func,
  shownMarks: PropTypes.number,
  type: PropTypes.string
}

HidePreviousMarksButton.defaultProps = {
  disabled: false,
  onClick: () => false,
  shownMarks: SHOWN_MARKS.ALL,
  type: 'drawing'
}
