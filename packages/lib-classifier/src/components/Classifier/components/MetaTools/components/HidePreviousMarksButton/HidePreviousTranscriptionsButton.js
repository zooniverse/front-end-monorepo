import { MetaToolsButton } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import PropTypes from 'prop-types'
import { Menu, Text } from 'grommet'
import { FormView, FormViewHide, Hide } from 'grommet-icons'
import React from 'react'
import styled, { withTheme } from 'styled-components'

import SHOWN_MARKS from '@helpers/shownMarks'
import en from './locales/en'

counterpart.registerTranslations('en', en)

const StyledText = styled(Text)`
  text-transform: uppercase;
`

function HidePreviousMarksTranscriptionButton (props) {
  const { disabled, onClick, shownMarks, theme } = props
  const color = theme.global.colors['neutral-2']

  const ALL = {
    icon: <FormView />,
    label: <StyledText color={color} margin={{ vertical: 'auto' }}>{counterpart('HidePreviousMarksTranscriptionButton.show')}</StyledText>,
    onClick: () => onClick(SHOWN_MARKS.ALL)
  }

  const USER = {
    icon: <FormViewHide />,
    label: <StyledText color={color} margin={{ vertical: 'auto' }}>{counterpart('HidePreviousMarksTranscriptionButton.showUser')}</StyledText>,
    disabled,
    onClick: () => onClick(SHOWN_MARKS.USER)
  }

  const NONE = {
    icon: <Hide />,
    label: <StyledText color={color} margin={{ vertical: 'auto' }}>{counterpart('HidePreviousMarksTranscriptionButton.hide')}</StyledText>,
    onClick: () => onClick(SHOWN_MARKS.NONE)
  }

  let items = new Map([['ALL', ALL], ['USER', USER], ['NONE', NONE]])
  const current = items.get(shownMarks)
  items.delete(shownMarks)

  return (
    <Menu
      a11yTitle={counterpart('HidePreviousMarksTranscriptionButton.toggle')}
      label={current.label}
      items={Array.from(items.values())}
    />
  )
}

HidePreviousMarksTranscriptionButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  shownMarks: PropTypes.string
}

HidePreviousMarksTranscriptionButton.defaultProps = {
  disabled: false,
  onClick: () => false,
  shownMarks: SHOWN_MARKS.ALL
}

export default withTheme(HidePreviousMarksTranscriptionButton)
