import React from 'react'
import PropTypes from 'prop-types'
import counterpart from 'counterpart'
import styled from 'styled-components'
import { Box, Heading, List, Paragraph } from 'grommet'
import { MovableModal } from '@zooniverse/react-components'
import en from './locales/en'

counterpart.registerTranslations('en', en)

const StyledList = styled(List)`
  font-family: "Roboto Mono Regular", monospace;
  font-size: 14px
`

export default function ConsensusPopup (props) {
  const {
    active,
    line
  } = props

  const itemProps = {}

  line.textOptions.forEach((option, index) => itemProps[index] = { border: false, pad: { horizontal: 'none', vertical: 'xsmall'} })

  return (
    <MovableModal
      active={active}
      closeFn={() => {}}
      headingBackground={{
        dark: 'dark-5',
        light: 'neutral-6'
      }}
      pad={{ bottom: 'medium', left: 'medium', right: 'medium' }}
      plain
      rndProps={{
        minHeight: 250,
        minWidth: 350,
        position: { x: 0, y: 0 }
      }}
      title={counterpart('ConsensusPopup.title')}
    >

      <Paragraph>
        {counterpart('ConsensusPopup.explanation')}
      </Paragraph>
      <Box>
        <Heading level={3} size='xsmall'>{line.consensusText}</Heading>
        <StyledList
          data={line.textOptions}
          itemProps={itemProps}
        />
      </Box>
    </MovableModal>
  )
}