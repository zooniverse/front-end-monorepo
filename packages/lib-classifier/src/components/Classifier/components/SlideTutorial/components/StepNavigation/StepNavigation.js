import counterpart from 'counterpart'
import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer, PropTypes as MobXPropTypes } from 'mobx-react'
import { Button, Box } from 'grommet'
import styled from 'styled-components'
import { FormNext, FormPrevious, Radial, RadialSelected } from 'grommet-icons'
import en from './locales/en'

counterpart.registerTranslations('en', en)

export const StyledButton = styled(Button)`
  background-color: transparent;

  &:hover, &:focus {
    > * svg {
      fill: black;
    }
  }
`

function storeMapper(stores) {
  const { active: tutorial, activeStep, setTutorialStep } = stores.classifierStore.tutorials
  return {
    activeStep,
    setTutorialStep,
    steps: tutorial.steps
  }
}

@inject(storeMapper)
@observer
class StepNavigation extends React.Component {
  render() {
    const { activeStep, setTutorialStep, steps } = this.props
    if (steps && steps.length > 1) {
      const nextStep = activeStep + 1
      const prevStep = activeStep - 1
      return (
        <Box direction='row' justify='center' tag='nav'>
          <StyledButton
            a11yTitle={counterpart('StepNavigation.previous')}
            data-index={prevStep}
            disabled={activeStep === 0}
            icon={<FormPrevious />}
            onClick={() => setTutorialStep(prevStep)}
            plain
          />
          {steps.map((step, index) => {
            const active = index === activeStep
            return (
              <StyledButton
                active={active}
                a11yTitle={counterpart('StepNavigation.go', { index })}
                data-index={index}
                key={`step-${index}`}
                icon={(active) ? <RadialSelected size='small' /> : <Radial size='small' />}
                onClick={() => setTutorialStep(index)}
                plain
              />
            )
          })}
          <StyledButton
            a11yTitle={counterpart('StepNavigation.next')}
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
}

StepNavigation.wrappedComponent.defaultProps = {
  activeStep: 0,
  setTutorialStep: () => {},
  steps: []
}

StepNavigation.wrappedComponent.propTypes = {
  activeStep: PropTypes.number,
  setTutorialStep: PropTypes.func,
  steps: PropTypes.array
}

export default StepNavigation