import React from 'react'
import PropTypes from 'prop-types'
import counterpart from 'counterpart'
import styled from 'styled-components'
import { Box, List, Paragraph, Text } from 'grommet'
import { MovableModal } from '@zooniverse/react-components'
import en from './locales/en'

counterpart.registerTranslations('en', en)

const StyledBox = styled(Box)`
  font-family: "Roboto Mono Regular", monospace;

  ${List} {
    font-size: 0.8em;
  }
`

export default function ConsensusPopup (props) {
  const {
    active,
    closeFn = () => {},
    line = {
      consensusText: '',
      textOptions: []
    },
    position = {
      x: 0,
      y: 0
    }
  } = props

  const itemProps = {}

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
      plain
      rndProps={{
        maxHeight: 350,
        minHeight: 250,
        minWidth: 350,
        position
      }}
      title={counterpart('ConsensusPopup.title')}
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