import { MetaToolsButton, SpacedText } from '@zooniverse/react-components'
import PropTypes from 'prop-types'
import { Box, DropButton } from 'grommet'
import { FormDown, FormView, FormViewHide, Hide } from 'grommet-icons'
import React from 'react'
import styled, { css, withTheme } from 'styled-components'
import { useTranslation } from '@translations/i18n'

import SHOWN_MARKS from '@helpers/shownMarks'

const StyledDrop = styled(DropButton)`
  div {
    padding: 0;
  }

  span {
    ${props => css`line-height: ${props.theme.paragraph.small.height};`}
  }
`

function HidePreviousTranscriptionsButton (props) {
  const { t } = useTranslation('components')
  const { disabled, onClick, shownMarks } = props
  const [isOpen, setOpen] = React.useState(false)

  const titles = {
    ALL: t('MetaTools.HidePreviousTranscriptionsButton.show'),
    USER: t('MetaTools.HidePreviousTranscriptionsButton.showUser'),
    NONE: t('MetaTools.HidePreviousTranscriptionsButton.hide')
  }
  const currentTitle = titles[shownMarks]

  return (
    <StyledDrop
      a11yTitle={currentTitle}
      dropContent={
        <Box role='radiogroup'>
          <MetaToolsButton
            a11yTitle={t('MetaTools.HidePreviousTranscriptionsButton.show')}
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
            text={t('MetaTools.HidePreviousTranscriptionsButton.show')}
          />
          <MetaToolsButton
            a11yTitle={t('MetaTools.HidePreviousTranscriptionsButton.showUser')}
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
            text={t('MetaTools.HidePreviousTranscriptionsButton.showUser')}
          />
          <MetaToolsButton
            a11yTitle={t('MetaTools.HidePreviousTranscriptionsButton.hide')}
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
            text={t('MetaTools.HidePreviousTranscriptionsButton.hide')}
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
        <SpacedText color={{ dark: 'accent-1', light: 'neutral-1' }}>{currentTitle}</SpacedText>
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
