import { useState } from 'react'
import styled from 'styled-components'
import { arrayOf, func, number, object, shape, string } from 'prop-types'
import { Box, Button, Paragraph } from 'grommet'
import { Markdownz, Media } from '@zooniverse/react-components'
import { useTranslation } from '@translations/i18n'

import StepNavigation from '././components/StepNavigation'

const StyledMarkdownWrapper = styled(Box)`
  > h1,
  h2 {
    font-size: 26px;
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
  steps={[...steps]}
  stepwithMedium={index => steps[index]}
/>
```
*/

const DEFAULT_HANDLER = () => true

function SlideTutorial({
  activeStep = 0,
  className = '',
  onComplete = DEFAULT_HANDLER,
  steps = [],
  stepWithMedium,
  strings = {}
}) {
  const [stepIndex, setStepIndex] = useState(activeStep)
  const { t } = useTranslation('components')
  const { medium, step } = stepWithMedium(stepIndex)
  const isThereMedia = medium?.src
  const isLastStep = stepIndex === steps.length - 1

  const emptyState = (
    <Box height='100%' width='100%' justify='center' align='center'>
      <Paragraph>{t('SlideTutorial.error')}</Paragraph>
    </Box>
  )

  return (
    <Box className={className}>
      <Box
        aria-live='polite'
        overflow={{ horizontal: 'hidden', vertical: 'auto' }}
        height={{ max: '70vh' }}
      >
        {isThereMedia && (
          <Media
            alt={t('SlideTutorial.alt', { activeStep: stepIndex })}
            alignSelf='center'
            fit='contain'
            height={300} // landscape images are best for tutorial media, but use a height constraint in case someone inserts a very tall portrait image/gif/video here.
            src={medium.src}
          />
        )}
        <StyledMarkdownWrapper pad={{ horizontal: 'small', top: '10px' }}>
          {!step ? emptyState : <Markdownz>{strings[`steps.${stepIndex}.content`]}</Markdownz>}
        </StyledMarkdownWrapper>
      </Box>
      <Box
        height={{ min: 'auto' }} // prevent StepNavigation from expanding beyond this container when it flex-wraps many radio buttons.
        width='100%'
      >
        <StepNavigation
          name='TutorialStepNavigation'
          onChange={setStepIndex}
          stepIndex={stepIndex}
          steps={steps}
        />
        {isLastStep && (
          <Button label={t('SlideTutorial.getStarted')} onClick={onComplete} primary />
        )}
      </Box>
    </Box>
  )
}

const tutorialStep = shape({
  content: string,
  medium: string
})

SlideTutorial.propTypes = {
  /** Array index of the current tutorial step. */
  activeStep: number,
  /** Optional CSS classes */
  className: string,
  /** Callback for the Get Started button. */
  onComplete: func,
  /**
    Array of tutorial steps.
    A step is a string of markdown content and an optional reference to a media file (image/audio/video.)
  */
  steps: arrayOf(tutorialStep),
  /** A function which should return the step and media file for a given step index. */
  stepWithMedium: func.isRequired,
  /** Translated strings for the tutorial content */
  strings: object
}

export default SlideTutorial
