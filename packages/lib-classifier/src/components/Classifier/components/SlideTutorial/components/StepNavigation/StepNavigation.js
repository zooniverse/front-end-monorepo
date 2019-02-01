import counterpart from 'counterpart'
import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer, PropTypes as MobXPropTypes } from 'mobx-react'
import { Button, Box, RadioButton } from 'grommet'
import styled from 'styled-components'
import { FormNext, FormPrevious } from 'grommet-icons'
import en from './locales/en'

counterpart.registerTranslations('en', en)

const HiddenRadioLabel = styled.span`
  display: flex;
  flex-direction: row;
  position: relative;
  ${RadioButton} span {
    height: 0;
    overflow: hidden;
    position: absolute;
    width: 0;
  }
`

function storeMapper (stores) {
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
  render () {
    const { activeStep, setTutorialStep, steps } = this.props
    if (steps && steps.length > 1) {
      const nextStep = activeStep + 1
      const prevStep = activeStep - 1
      return (
        <Box direction='row' justify='center' tag='nav'>
          <Button
            a11yTitle={counterpart('StepNavigation.previous')}
            data-index={prevStep}
            disabled={activeStep === 0}
            icon={<FormPrevious />}
            onClick={() => setTutorialStep(prevStep)}
            plain
          />
          {steps.map((step, index) => {
            const active = index === activeStep
            const key = `step-${index}`
            return (
              <HiddenRadioLabel>
                <RadioButton
                  checked={active}
                  id={key}
                  key={key}
                  label={counterpart('StepNavigation.go', { index: index + 1 })}
                  name='step-selectors'
                  onChange={() => setTutorialStep(index)}
                  value={index}
                />
              </HiddenRadioLabel>
            )
          })}
          <Button
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
