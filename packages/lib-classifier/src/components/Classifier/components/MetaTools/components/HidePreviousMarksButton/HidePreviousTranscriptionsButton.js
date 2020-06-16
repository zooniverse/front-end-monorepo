import { SpacedText } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import PropTypes from 'prop-types'
import { Menu, Text } from 'grommet'
import { FormDown, FormView, FormViewHide, Hide } from 'grommet-icons'
import React from 'react'
import styled, { css, withTheme } from 'styled-components'

import SHOWN_MARKS from '@helpers/shownMarks'
import en from './locales/en'

counterpart.registerTranslations('en', en)

const StyledMenu = styled(Menu)`
  div {
    margin-top: 10px;
    padding: 0;
  }

  span {
    ${props => css`line-height: ${props.theme.paragraph.small.height};`}
  }
`

function HidePreviousTranscriptionsButton (props) {
  const { disabled, onClick, shownMarks } = props

  const ALL = {
    'aria-checked': shownMarks === SHOWN_MARKS.ALL,
    role: 'radio',
    icon: <FormView />,
    label: <SpacedText color={{ dark: 'accent-2', light: 'neutral-2' }} margin={{ vertical: 'auto' }}>{counterpart('HidePreviousTranscriptionsButton.show')}</SpacedText>,
    onClick: () => onClick(SHOWN_MARKS.ALL),
    title: counterpart('HidePreviousTranscriptionsButton.show')
  }

  const USER = {
    'aria-checked': shownMarks === SHOWN_MARKS.USER,
    role: 'radio',
    icon: <FormViewHide />,
    label: <SpacedText color={{ dark: 'accent-2', light: 'neutral-2' }} margin={{ vertical: 'auto' }}>{counterpart('HidePreviousTranscriptionsButton.showUser')}</SpacedText>,
    disabled,
    onClick: () => onClick(SHOWN_MARKS.USER),
    title: counterpart('HidePreviousTranscriptionsButton.showUser')
  }

  const NONE = {
    'aria-checked': shownMarks === SHOWN_MARKS.NONE,
    role: 'radio',
    icon: <Hide />,
    label: <SpacedText color={{ dark: 'accent-2', light: 'neutral-2' }} margin={{ vertical: 'auto' }}>{counterpart('HidePreviousTranscriptionsButton.hide')}</SpacedText>,
    onClick: () => onClick(SHOWN_MARKS.NONE),
    title: counterpart('HidePreviousTranscriptionsButton.hide')
  }

  let items = new Map([['ALL', ALL], ['USER', USER], ['NONE', NONE]])
  const current = items.get(shownMarks)

  return (
    <StyledMenu
      a11yTitle={current.title}
      dropProps={{ align: { top: 'bottom', left: 'left' } }}
      label={current.label}
      icon={<FormDown />}
      items={Array.from([ALL, USER, NONE])}
      role='radiogroup'
    />
  )
}

HidePreviousTranscriptionsButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  shownMarks: PropTypes.string
}

HidePreviousTranscriptionsButton.defaultProps = {
  disabled: false,
  onClick: () => false,
  shownMarks: SHOWN_MARKS.ALL
}

export default withTheme(HidePreviousTranscriptionsButton)
export { HidePreviousTranscriptionsButton, StyledMenu }
