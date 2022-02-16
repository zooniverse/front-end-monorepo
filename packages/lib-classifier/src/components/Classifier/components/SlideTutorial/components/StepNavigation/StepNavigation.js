import React from 'react'
import PropTypes from 'prop-types'
import { Button, Box, RadioButtonGroup } from 'grommet'
import styled from 'styled-components'
import { FormNext, FormPrevious } from 'grommet-icons'
import { withStores } from '@helpers'
import { useTranslation } from 'react-i18next'

const StyledButton = styled(Button)`
  &:first-of-type {
    margin: 0 15px 0 0;
    padding: 0;
  }

  &:last-of-type {
    margin: 0;
    padding: 0;
  }
`

const StyledRadioButtonGroup = styled(RadioButtonGroup)`
  position: relative;

  > label {
    > span {
        height: 0;
        overflow: hidden;
        position: absolute;
        width: 0;
      }

    > div {
      margin-right: 15px;
    }
  }
`

function storeMapper (classifierStore) {
  const {
    active: tutorial,
    activeStep,
    setTutorialStep
  } = classifierStore.tutorials

  return {
    activeStep,
    setTutorialStep,
    steps: tutorial.steps
  }
}

function StepNavigation({
  activeStep = 0,
  className = '',
  setTutorialStep = () => {},
  steps = []
}) {
  const { t } = useTranslation('components')

  function onChange(event) {
    const indexValue = event.target.value.split('-')[1]
    setTutorialStep(Number(indexValue))
  }

  if (steps?.length > 1) {
    const nextStep = activeStep + 1
    const prevStep = activeStep - 1
    const options = steps.map((step, index) => {
      const label = t('SlideTutorial.StepNavigation.go', { index: index + 1 })
      // We can't just use index for the value
      // because Grommet is using indexes internally as keys and this will error with a duplicate key
      const value = `step-${index}`
      return {
        id: value,
        label,
        value
      }
    })
    return (
      <Box align='center' className={className} direction='row' justify='center' margin={{ top: 'medium' }}>
        <StyledButton
          a11yTitle={t('SlideTutorial.StepNavigation.previous')}
          data-index={prevStep}
          disabled={activeStep === 0}
          icon={<FormPrevious />}
          onClick={() => setTutorialStep(prevStep)}
          plain
        />
        <StyledRadioButtonGroup
          direction='row'
          gap='none'
          name='step-selectors'
          onChange={onChange}
          options={options}
          value={`step-${activeStep}`}
        />
        <StyledButton
          a11yTitle={t('SlideTutorial.StepNavigation.next')}
          data-index={nextStep}
          disabled={activeStep === steps.length - 1}
          icon={<FormNext />}
          onClick={() => setTutorialStep(nextStep)}
          plain
        />
      </Box>
    )
  }

  return null
}

StepNavigation.propTypes = {
  activeStep: PropTypes.number,
  className: PropTypes.string,
  setTutorialStep: PropTypes.func,
  steps: PropTypes.array
}

export default withStores(StepNavigation, storeMapper)
