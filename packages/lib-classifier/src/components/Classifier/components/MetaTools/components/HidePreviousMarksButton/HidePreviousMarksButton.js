import { MetaToolsButton } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import PropTypes from 'prop-types'
import { FormView, FormViewHide, Hide } from 'grommet-icons'
import React from 'react'

import SHOWN_MARKS from '../../../../../../helpers/shownMarks'
import en from './locales/en'

counterpart.registerTranslations('en', en)

export default function HidePreviousMarksButton (props) {
  const { disabled, onClick, shownMarks } = props
  let text, icon;

  switch(shownMarks) {
    case SHOWN_MARKS.ALL:
      text = counterpart('HidePreviousMarksButton.showUser')
      icon = <FormView />
      break;
    case SHOWN_MARKS.USER:
      text = counterpart('HidePreviousMarksButton.hide')
      icon = <Hide />
      break;
    default:
      text = counterpart('HidePreviousMarksButton.show')
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
