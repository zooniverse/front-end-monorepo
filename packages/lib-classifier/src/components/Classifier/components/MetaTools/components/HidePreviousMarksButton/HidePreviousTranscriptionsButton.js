import { SpacedText } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import PropTypes from 'prop-types'
import { Box, DropButton } from 'grommet'
import { FormDown, FormView, FormViewHide, Hide } from 'grommet-icons'
import React from 'react'
import styled, { css, withTheme } from 'styled-components'
import { MetaToolsButton } from '@zooniverse/react-components'

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
          <MetaToolsButton
            a11yTitle={counterpart('HidePreviousTranscriptionsButton.show')}
            active={shownMarks === SHOWN_MARKS.ALL}
            aria-checked={shownMarks === SHOWN_MARKS.ALL}
            icon={<FormView />}
            margin={{ top: '0' }}
            onClick={() => {
              onClick(SHOWN_MARKS.ALL)
              setOpen(false)
            }}
            padding='0.5em'
            role='radio'
            text={counterpart('HidePreviousTranscriptionsButton.show')}
          />
          <MetaToolsButton
            a11yTitle={counterpart('HidePreviousTranscriptionsButton.showUser')}
            active={shownMarks === SHOWN_MARKS.USER}
            aria-checked={shownMarks === SHOWN_MARKS.USER}
            disabled={disabled}
            icon={<FormViewHide />}
            margin={{ top: '0' }}
            onClick={() => {
              onClick(SHOWN_MARKS.USER)
              setOpen(false)
            }}
            padding='0.5em'
            role='radio'
            text={counterpart('HidePreviousTranscriptionsButton.showUser')}
          />
          <MetaToolsButton
            a11yTitle={counterpart('HidePreviousTranscriptionsButton.hide')}
            active={shownMarks === SHOWN_MARKS.NONE}
            aria-checked={shownMarks === SHOWN_MARKS.NONE}
            icon={<Hide />}
            margin={{ top: '0' }}
            onClick={() => {
              onClick(SHOWN_MARKS.NONE)
              setOpen(false)
            }}
            padding='0.5em'
            role='radio'
            text={counterpart('HidePreviousTranscriptionsButton.hide')}
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
export { HidePreviousTranscriptionsButton, StyledDrop }
