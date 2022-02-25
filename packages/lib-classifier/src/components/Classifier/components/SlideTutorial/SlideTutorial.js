import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Box, Button, Heading, Paragraph } from 'grommet'
import { Markdownz, Media } from '@zooniverse/react-components'
import { useTranslation } from 'react-i18next'

import StepNavigation from './components/StepNavigation'

const StyledMarkdownWrapper = styled(Box)`
  > h1, h2 {
    font-size: 26px;
    line-height: 31px;
  }

  > p {
    margin-top: 10px;
    margin-bottom: 10px;
  }
`

function SlideTutorial({
  activeStep = 0,
  className = '',
  projectDisplayName = '',
  onClick = () => true,
  height,
  pad = 'medium',
  setSeenTime = () => true,
  steps = [],
  stepWithMedium,
  width
}) {
  const [stepIndex, setStepIndex] = useState(activeStep)
  const { t } = useTranslation('components')
  const { medium, step } = stepWithMedium(stepIndex)
  const isThereMedia = medium?.src
  const isFirstStep = stepIndex === 0
  const isLastStep = stepIndex === steps.length - 1

  if (!step) {
    return (
      <Box height='100%' justify='between' pad={pad}>
        <Paragraph>{t('SlideTutorial.error')}</Paragraph>
      </Box>
    )
  }

  function getStarted() {
    setSeenTime()
    onClick()
  }

  return (
    <Box
      className={className}
      height={height}
      justify='between'
      pad={pad}
      width={width}
    >
      <StyledMarkdownWrapper
        aria-live='polite'
        autoFocus
        height='100%'
        overflow={{ horizontal: 'hidden', vertical: 'auto' }}
      >
        {isThereMedia &&
          <Media
            alt={t('SlideTutorial.alt', { activeStep })}
            fit='cover'
            height={200}
            src={medium.src}
          />}
        {isFirstStep &&
          <Heading level='3' margin={{ bottom: 'xsmall', top: 'small' }}>
            {t('SlideTutorial.heading', { projectDisplayName })}
          </Heading>}
        {/* TODO: translation */}
        <Markdownz>{step.content}</Markdownz>
      </StyledMarkdownWrapper>
        <StepNavigation
          onChange={setStepIndex}
          stepIndex={stepIndex}
          steps={steps}
        />
      {isLastStep &&
        <Button
          label={t('SlideTutorial.getStarted')}
          onClick={getStarted}
          margin={{ top: 'medium' }}
          primary
        />}
    </Box>
  )
}

SlideTutorial.propTypes = {
  activeStep: PropTypes.number,
  className: PropTypes.string,
  projectDisplayName: PropTypes.string,
  onClick: PropTypes.func,
  stepWithMedium: PropTypes.func.isRequired
}

export default SlideTutorial
