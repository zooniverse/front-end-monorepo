import { MobXProviderContext, observer } from 'mobx-react'
import React, { useContext } from 'react'

import DoneButton from './DoneButton'

function withStores(Component) {
  function DoneButtonConnector(props) {
    const {
      classifierStore: {
        subjects: {
          active: subject
        },
        classifications: {
          completeClassification
        },
        workflowSteps: {
          active: step
        }
      }
    } = props.store || useContext(MobXProviderContext)

    const { finish, hasNextStep, latest } = subject.stepHistory
    const annotations = latest?.annotations

    if (hasNextStep) {
      return null
    }

    function onClick(event) {
      event.preventDefault()
      step.completeAndValidate(annotations)
      finish()
      return completeClassification()
    }

    return (
      <Component
        hasNextStep={hasNextStep}
        onClick={onClick}
        {...props}
      />
    )
  }
  return observer(DoneButtonConnector)
}

export default withStores(DoneButton)
