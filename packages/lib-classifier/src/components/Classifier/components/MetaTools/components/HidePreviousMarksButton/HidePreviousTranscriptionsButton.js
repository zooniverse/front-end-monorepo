import { MetaToolsButton } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import PropTypes from 'prop-types'
import { Menu } from 'grommet'
import { FormView, FormViewHide, Hide } from 'grommet-icons'
import React from 'react'
import styled from 'styled-components'

import SHOWN_MARKS from '@helpers/shownMarks'
import en from './locales/en'

counterpart.registerTranslations('en', en)

export default function HidePreviousMarksTranscriptionButton (props) {
  const { disabled, onClick, shownMarks } = props

  const ALL = {
    icon: <FormView />,
    label: counterpart('HidePreviousMarksTranscriptionButton.show'),
    onClick: () => onClick(SHOWN_MARKS.ALL)
  }

  const USER = {
    icon: <FormViewHide />,
    label: counterpart('HidePreviousMarksTranscriptionButton.showUser'),
    disabled,
    onClick: () => onClick(SHOWN_MARKS.USER)
  }

  const NONE = {
    icon: <Hide />,
    label: counterpart('HidePreviousMarksTranscriptionButton.hide'),
    onClick: () => onClick(SHOWN_MARKS.NONE)
  }

  let items = new Map([['ALL', ALL], ['USER', USER], ['NONE', NONE]])
  const current = items.get(shownMarks)
  items.delete(shownMarks)

  return (
    <Menu
      label={current.label}
      items={Array.from(items.values())}
    />
  )
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
