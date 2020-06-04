import { MetaToolsButton } from '@zooniverse/react-components'
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

  &:hover {
    text-decoration: underline;
  }
`

const StyledText = styled(Text)`
  ${props => css`color: ${props.theme.global.colors['neutral-2']};`}
  text-transform: uppercase;

  &:hover {
    text-decoration: underline;
  }
`

function HidePreviousTranscriptionsButton (props) {
  const { disabled, onClick, shownMarks } = props

  const ALL = {
    icon: <FormView />,
    label: <StyledText margin={{ vertical: 'auto' }} {...props}>{counterpart('HidePreviousTranscriptionsButton.show')}</StyledText>,
    onClick: () => onClick(SHOWN_MARKS.ALL)
  }

  const USER = {
    icon: <FormViewHide />,
    label: <StyledText margin={{ vertical: 'auto' }} {...props}>{counterpart('HidePreviousTranscriptionsButton.showUser')}</StyledText>,
    disabled,
    onClick: () => onClick(SHOWN_MARKS.USER)
  }

  const NONE = {
    icon: <Hide />,
    label: <StyledText margin={{ vertical: 'auto' }} {...props}>{counterpart('HidePreviousTranscriptionsButton.hide')}</StyledText>,
    onClick: () => onClick(SHOWN_MARKS.NONE)
  }

  let items = new Map([['ALL', ALL], ['USER', USER], ['NONE', NONE]])
  const current = items.get(shownMarks)
  items.delete(shownMarks)

  return (
    <StyledMenu
      a11yTitle={counterpart('HidePreviousTranscriptionsButton.toggle')}
      label={current.label}
      icon={<FormDown />}
      items={Array.from(items.values())}
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
