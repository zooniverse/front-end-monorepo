import React from 'react'
import { inject, observer, PropTypes as MobXPropTypes } from 'mobx-react'
import { Button, Box } from 'grommet'
import { FormNext, FormPrevious, Radial, RadialSelected } from 'grommet-icons'

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
  constructor() {
    super()
  }

  setStep(index) {
    const { setTutorialStep } = this.props
    setTutorialStep(index)
  }

  render() {
    const { activeStep, steps } = this.props
    if (steps.length > 1) {
      return (
        <Box direction='row' justify='center' tag='nav'>
          <Button
            a11yTitle='Go to previous step'
            disabled={activeStep === 0}
            icon={<FormPrevious />}
            onClick={() => this.setStep(activeStep - 1)}
            plain
          />
          {steps.map((step, index) => {
            const active = index === activeStep
            return (
              <Button
                active={active}
                a11yTitle={`Go to step ${index}`}
                key={`step-${index}`}
                icon={(active) ? <RadialSelected size='small' /> : <Radial size='small' />}
                onClick={() => this.setStep(index)}
                plain
              />
            )
          })}
          <Button
            a11yTitle='Go to next step'
            disabled={activeStep === steps.length - 1}
            icon={<FormNext />}
            onClick={() => this.setStep(steps.length - 1)}
            plain
          />
        </Box>
      )
    }

    return null
  }
}

export default StepNavigation