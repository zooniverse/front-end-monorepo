import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Box, Button, Heading, Paragraph } from 'grommet'
import { Markdownz, Media } from '@zooniverse/react-components'
import { useTranslation } from 'react-i18next'

import StepNavigation from '@shared/StepNavigation'

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

/**
A workflow slide tutorial which can be embedded directly into the classifier or shown in a popup.

```
<SlideTutorial
  activeStep={0}
  height='100%'
  steps={[...steps]}
  stepwithMedium={index => steps[index]}
  width='40vw'
/>
```
*/
function SlideTutorial({
  activeStep = 0,
  className = '',
  projectDisplayName = '',
  onClick = () => true,
  height,
  pad = 'medium',
  steps = [],
  stepWithMedium,
  strings = {},
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
            alt={t('SlideTutorial.alt', { activeStep: stepIndex })}
            fit='cover'
            height={200}
            src={medium.src}
          />}
        {isFirstStep &&
          <Heading level='3' margin={{ bottom: 'xsmall', top: 'small' }}>
            {t('SlideTutorial.heading', { projectDisplayName })}
          </Heading>}
        <Markdownz>{strings[`steps.${stepIndex}.content`]}</Markdownz>
      </StyledMarkdownWrapper>
        <StepNavigation
          onChange={setStepIndex}
          stepIndex={stepIndex}
          steps={steps}
        />
      {isLastStep &&
        <Button
          label={t('SlideTutorial.getStarted')}
          onClick={onClick}
          margin={{ top: 'medium' }}
          primary
        />}
    </Box>
  )
}

const tutorialStep = PropTypes.shape({
  content: PropTypes.string,
  medium: PropTypes.string
})

SlideTutorial.propTypes = {
  /** Array index of the current tutorial step. */
  activeStep: PropTypes.number,
  /** Optional CSS classes */
  className: PropTypes.string,
  /** Tutorial height (CSS units). */
  height: PropTypes.string,
  /** The project name */
  projectDisplayName: PropTypes.string,
  /** Callback for the Get Started button. */
  onClick: PropTypes.func,
  /**
    Array of tutorial steps.
    A step is a string of markdown content and an optional reference to a media file (image/audio/video.)
  */
  steps: PropTypes.arrayOf(tutorialStep),
  /** A function which should return the step and media file for a given step index. */
  stepWithMedium: PropTypes.func.isRequired,
  /** Translated strings for the tutorial content */
  strings: PropTypes.object,
  /** Tutorial width (CSS units). */
  width: PropTypes.string,
}

export default SlideTutorial
