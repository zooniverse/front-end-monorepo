import counterpart from 'counterpart'
import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer, PropTypes as MobXPropTypes } from 'mobx-react'
import { Button, Box, RadioButtonGroup } from 'grommet'
import styled from 'styled-components'
import { FormNext, FormPrevious } from 'grommet-icons'
import en from './locales/en'

counterpart.registerTranslations('en', en)

const StyledRadioButtonGroup = styled(RadioButtonGroup)`
  position: relative;

  > label > span {
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
  onChange (event) {
    const { setTutorialStep } = this.props
    const indexValue = event.target.value.split('-')[1]
    setTutorialStep(Number(indexValue))
  }

  render () {
    const { activeStep, className, setTutorialStep, steps } = this.props
    if (steps && steps.length > 1) {
      const nextStep = activeStep + 1
      const prevStep = activeStep - 1
      const options = steps.map((step, index) => {
        const label = counterpart('StepNavigation.go', { index: index + 1 })
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
        <Box as='nav' className={className} direction='row' justify='center'>
          <Button
            a11yTitle={counterpart('StepNavigation.previous')}
            data-index={prevStep}
            disabled={activeStep === 0}
            icon={<FormPrevious />}
            onClick={() => setTutorialStep(prevStep)}
            plain
          />
          <StyledRadioButtonGroup
            direction='row'
            name='step-selectors'
            onChange={this.onChange.bind(this)}
            options={options}
            value={`step-${activeStep}`}
          />
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
  className: '',
  setTutorialStep: () => {},
  steps: []
}

StepNavigation.wrappedComponent.propTypes = {
  activeStep: PropTypes.number,
  className: PropTypes.string,
  setTutorialStep: PropTypes.func,
  steps: PropTypes.array
}

export default StepNavigation
