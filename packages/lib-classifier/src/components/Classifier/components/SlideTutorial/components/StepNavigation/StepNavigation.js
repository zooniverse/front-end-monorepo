import counterpart from 'counterpart'
import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer, PropTypes as MobXPropTypes } from 'mobx-react'
import { Button, Box, RadioButtonGroup } from 'grommet'
import styled from 'styled-components'
import { FormNext, FormPrevious } from 'grommet-icons'
import zooTheme from '@zooniverse/grommet-theme'
import en from './locales/en'

counterpart.registerTranslations('en', en)

// const HiddenRadioLabel = styled.span`
//   display: flex;
//   flex-direction: row;
//   position: relative;
//   ${StyledRadioButton} span {
//     height: 0;
//     overflow: hidden;
//     position: absolute;
//     width: 0;
//   }
// `

// const StyledRadioButton = styled(RadioButton)`
//   outline: ${(props) => (props.focused) ? zooTheme.global.colors['accent-2'] : 'none'}
// `

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
  constructor() {
    super()
    this.state = {
      focused: -1
    }
  }

  onFocus (e) {
    const keyPressed = e.keyCode ? e.keyCode : e.which
    console.log('onfocus', keyPressed, e, e.target)
    if (keyPressed === 9) { // tab is pressed
      this.setState({ focused: e.target.value })
    }
  }

  removeFocus () {
    this.setState({ focused: -1 })
  }

  onChange (event) {
    const { setTutorialStep } = this.props
    const indexValue = event.target.value.split('-')[1]
    setTutorialStep(Number(indexValue))
  }

  render () {
    const { activeStep, setTutorialStep, steps } = this.props
    if (steps && steps.length > 1) {
      const nextStep = activeStep + 1
      const prevStep = activeStep - 1
      const options = steps.map((step, index) => {
        const name = counterpart('StepNavigation.go', { index: index + 1 })
        return {
          id: `step-${index}`,
          name,
          // We can't just use index because Grommet is using indexes internally as keys and this will error with a duplicate key
          value: `step-${index}` 
        }
      })
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
          <RadioButtonGroup
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
  setTutorialStep: () => {},
  steps: []
}

StepNavigation.wrappedComponent.propTypes = {
  activeStep: PropTypes.number,
  setTutorialStep: PropTypes.func,
  steps: PropTypes.array
}

export default StepNavigation


// {
//   steps.map((step, index) => {
//     const active = index === activeStep
//     const key = `step-${index}`
//     const focused = index === this.state.focused
//     console.log(this.state.focused)
//     return (
//       <HiddenRadioLabel key={key}>
//         <StyledRadioButton
//           autoFocus={index === 0}
//           checked={active}
//           focused={focused}
//           id={key}
//           label={counterpart('StepNavigation.go', { index: index + 1 })}
//           name='step-selectors'
//           onChange={() => setTutorialStep(index)}
//           value={index}
//         />
//       </HiddenRadioLabel>
//     )
    // })}