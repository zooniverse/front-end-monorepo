import { MobXProviderContext, observer } from 'mobx-react'
import React, { useContext } from 'react'

import NextButton from './NextButton'

function withStores(Component) {
  function NextButtonConnector(props) {
    const {
      classifierStore: {
        subjects: {
          active: subject
        },
        workflowSteps: {
          active: step
        }
      }
    } = props.store || useContext(MobXProviderContext)

    const { next, hasNextStep, latest } = subject.stepHistory
    const annotations = latest?.annotations

    if (!hasNextStep) {
      return null
    }

    function onClick() {
      step.completeAndValidate(annotations)
      next()
    }

    return (
      <Component
        onClick={onClick}
        {...props}
      />
    )
  }
  return observer(NextButtonConnector)
}

export default withStores(NextButton)
