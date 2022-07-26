import React from 'react'
import { array, bool, func, object, shape, string } from 'prop-types'
import styled from 'styled-components'
import { Box, List, Paragraph, Text } from 'grommet'
import { MovableModal } from '@zooniverse/react-components'
import { useTranslation } from 'react-i18next'

import getDefaultPosition from '../../../../helpers/getDefaultPosition'
import { MIN_POPUP_HEIGHT, MIN_POPUP_WIDTH } from './helpers/constants'

const StyledBox = styled(Box)`
  font-family: "Roboto Mono Regular", monospace;

  ul {
    font-size: 0.8em;
  }
`
/**
  A popup which shows the previous annotations for a single transcription line.
*/
export default function ConsensusPopup ({
  active = false,
  bounds = undefined,
  closeFn = () => {},
  line = {
    consensusText: '',
    textOptions: []
  }
}) {
  const { t } = useTranslation('components')
  const itemProps = {}
  const position = getDefaultPosition(bounds, MIN_POPUP_HEIGHT, MIN_POPUP_WIDTH)

  line.textOptions.forEach((option, index) => itemProps[index] = { border: false, pad: { horizontal: 'none', vertical: 'xsmall'} })

  function onWheel(event) {
    event.stopPropagation()
  }

  return (
    <MovableModal
      active={active}
      closeFn={closeFn}
      headingBackground={{
        dark: 'dark-5',
        light: 'neutral-6'
      }}
      height={{ min: '250px', max: '350px' }}
      onWheel={onWheel}
      pad={{ bottom: 'medium', left: 'medium', right: 'medium' }}
      position='top-left'
      plain
      rndProps={{
        default: position,
        maxHeight: 350,
        minHeight: MIN_POPUP_HEIGHT,
        minWidth: MIN_POPUP_WIDTH
      }}
      title={t('SubjectViewer.InteractionLayer.TranscribedLines.ConsensusPopup.title')}
      titleColor=''
    >
      <Paragraph>
        {t('SubjectViewer.InteractionLayer.TranscribedLines.ConsensusPopup.explanation', { count: line.textOptions.length })}
      </Paragraph>
      <StyledBox>
        {line.consensusText &&
          <Paragraph>
            {line.consensusText}
            <br />
            <Text><em>{t('SubjectViewer.InteractionLayer.TranscribedLines.ConsensusPopup.aggregatedTranscription')}</em></Text>
          </Paragraph>}
        {!line.consensusText &&
          <Paragraph>{t('SubjectViewer.InteractionLayer.TranscribedLines.ConsensusPopup.noAggregation')}</Paragraph>}
        {line.textOptions.length > 0 &&
          <List
            data={line.textOptions}
            itemProps={itemProps}
          />}
        {line.textOptions.length === 0 &&
          <Paragraph>{t('SubjectViewer.InteractionLayer.TranscribedLines.ConsensusPopup.transcriptionsUnavailable')}</Paragraph>}
      </StyledBox>
    </MovableModal>
  )
}

ConsensusPopup.propTypes = {
  /**
    Modal active state.
  */
  active: bool,
  /**
    Bounding rectangle in the browser.
  */
  bounds: object,
  /**
    Callback for the modal's close button.
  */
  closeFn: func,
  /**
    Consensus options for the current line.
  */
  line: shape({
    consensusText: string,
    textOptions: array
  })
}
