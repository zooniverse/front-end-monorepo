import { MetaToolsButton } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import PropTypes from 'prop-types'
import { Menu } from 'grommet'
import { FormView, FormViewHide, Hide } from 'grommet-icons'
import React from 'react'

import SHOWN_MARKS from '@helpers/shownMarks'
import en from './locales/en'

counterpart.registerTranslations('en', en)

export default function HidePreviousMarksTranscriptionButton (props) {
  const { disabled, onClick, shownMarks, type } = props
  let label, text, icon;
  const isDrawingTask = type === 'drawing'

  const ALL = {
    label: 'ALL',
    onClick: () => onClick(SHOWN_MARKS.ALL)
  }

  const USER = {
    label: 'USER',
    onClick: () => onClick(SHOWN_MARKS.USER)
  }

  const NONE = {
    label: 'NONE',
    onClick: () => onClick(SHOWN_MARKS.NONE)
  }

  let options = [ALL, USER, NONE]
  const current = options.find(({ label }) => label === shownMarks)
  options = options.filter(({ label }) => label !== shownMarks)


  switch(shownMarks) {
    case SHOWN_MARKS.ALL:
      label = isDrawingTask ? counterpart('HidePreviousMarksDrawingButton.hide')
        : counterpart('HidePreviousMarksTranscriptionButton.showUser')
      icon = <FormView />
      break;
    case SHOWN_MARKS.USER:
      label = counterpart('HidePreviousMarksTranscriptionButton.hide')
      icon = <Hide />
      break;
    default:
      label = isDrawingTask ? counterpart('HidePreviousMarksDrawingButton.show')
        : counterpart('HidePreviousMarksTranscriptionButton.show')
      icon = <FormViewHide />
  }

  return (
    <Menu
      label={current.label}
      items={options}
    />
  )

  // return (
  //   <MetaToolsButton
  //     aria-live='assertive'
  //     aria-label={text}
  //     disabled={disabled}
  //     icon={icon}
  //     text={text}
  //     onClick={onClick}
  //   />
  // )
}

HidePreviousMarksTranscriptionButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  shownMarks: PropTypes.string,
  type: PropTypes.string
}

HidePreviousMarksTranscriptionButton.defaultProps = {
  disabled: false,
  onClick: () => false,
  shownMarks: SHOWN_MARKS.ALL,
  type: 'drawing'
}
