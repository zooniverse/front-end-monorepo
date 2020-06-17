import { SpacedText } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import PropTypes from 'prop-types'
import { Box, DropButton } from 'grommet'
import { FormDown, FormView, FormViewHide, Hide } from 'grommet-icons'
import React from 'react'
import styled, { css, withTheme } from 'styled-components'
import HideTranscriptionButton from './HideTranscriptionButton'

import SHOWN_MARKS from '@helpers/shownMarks'
import en from './locales/en'

counterpart.registerTranslations('en', en)

const StyledDrop = styled(DropButton)`
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
  const [isOpen, setOpen] = React.useState(false)

  const titles = {
    ALL: counterpart('HidePreviousTranscriptionsButton.show'),
    USER: counterpart('HidePreviousTranscriptionsButton.showUser'),
    NONE: counterpart('HidePreviousTranscriptionsButton.hide')
  }
  const currentTitle = titles[shownMarks]

  return (
    <StyledDrop
      a11yTitle={currentTitle}
      dropContent={
        <Box role='radiogroup'>
          <HideTranscriptionButton
            checked={shownMarks === SHOWN_MARKS.ALL}
            icon={<FormView />}
            onClick={() => {
              onClick(SHOWN_MARKS.ALL)
              setOpen(false)
            }}
            title={counterpart('HidePreviousTranscriptionsButton.show')}
          />
          <HideTranscriptionButton
            checked={shownMarks === SHOWN_MARKS.USER}
            icon={<FormViewHide />}
            disabled={disabled}
            onClick={() => {
              onClick(SHOWN_MARKS.USER)
              setOpen(false)
            }}
            title={counterpart('HidePreviousTranscriptionsButton.showUser')}
          />
          <HideTranscriptionButton
            checked={shownMarks === SHOWN_MARKS.NONE}
            icon={<Hide />}
            onClick={() => {
              onClick(SHOWN_MARKS.NONE)
              setOpen(false)
            }}
            title={counterpart('HidePreviousTranscriptionsButton.hide')}
          />
        </Box>
      }
      dropProps={{ align: { top: 'bottom', left: 'left' } }}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={isOpen}
      plain
    >
      <Box align='center' direction='row'>
        <FormDown />
        <SpacedText color={{ dark: 'accent-2', light: 'neutral-2' }}>{currentTitle}</SpacedText>
      </Box>
    </StyledDrop>
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
export { HidePreviousTranscriptionsButton }
