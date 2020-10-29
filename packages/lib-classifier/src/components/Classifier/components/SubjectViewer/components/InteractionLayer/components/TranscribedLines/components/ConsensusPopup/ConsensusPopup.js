import React from 'react'
import PropTypes from 'prop-types'
import counterpart from 'counterpart'
import styled from 'styled-components'
import { Box, List, Paragraph, Text } from 'grommet'
import { MovableModal } from '@zooniverse/react-components'
import en from './locales/en'
import getDefaultPosition from '../../../../helpers/getDefaultPosition'
import { MIN_POPUP_HEIGHT, MIN_POPUP_WIDTH } from './helpers/constants'

counterpart.registerTranslations('en', en)

const StyledBox = styled(Box)`
  font-family: "Roboto Mono Regular", monospace;

  ${List} {
    font-size: 0.8em;
  }
`

export default function ConsensusPopup (props) {
  const {
    active = false,
    bounds = undefined,
    closeFn = () => {},
    line = {
      consensusText: '',
      textOptions: []
    }
  } = props

  const itemProps = {}
  const position = getDefaultPosition(bounds, MIN_POPUP_HEIGHT, MIN_POPUP_WIDTH)

  line.textOptions.forEach((option, index) => itemProps[index] = { border: false, pad: { horizontal: 'none', vertical: 'xsmall'} })

  return (
    <MovableModal
      active={active}
      closeFn={closeFn}
      headingBackground={{
        dark: 'dark-5',
        light: 'neutral-6'
      }}
      height={{ min: '250px', max: '350px' }}
      pad={{ bottom: 'medium', left: 'medium', right: 'medium' }}
      position='top-left'
      plain
      rndProps={{
        maxHeight: 350,
        minHeight: MIN_POPUP_HEIGHT,
        minWidth: MIN_POPUP_WIDTH,
        position
      }}
      title={counterpart('ConsensusPopup.title')}
      titleColor=''
    >
      <Paragraph>
        {counterpart('ConsensusPopup.explanation', { count: line.textOptions.length })}
      </Paragraph>
      <StyledBox>
        {line.consensusText &&
          <Paragraph>
            {line.consensusText}
            <br />
            <Text><em>{counterpart('ConsensusPopup.aggregatedTranscription')}</em></Text>
          </Paragraph>}
        {!line.consensusText &&
          <Paragraph>{counterpart('ConsensusPopup.noAggregation')}</Paragraph>}
        {line.textOptions.length > 0 &&
          <List
            data={line.textOptions}
            itemProps={itemProps}
          />}
        {line.textOptions.length === 0 &&
          <Paragraph>{counterpart('ConsensusPopup.transcriptionsUnavailable')}</Paragraph>}
      </StyledBox>
    </MovableModal>
  )
}