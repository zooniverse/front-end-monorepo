import { MobXProviderContext, observer } from 'mobx-react'
import React, { useContext } from 'react'

import DoneButton from './DoneButton'

function withStores(Component) {
  function DoneButtonConnector(props) {
    const {
      classifierStore: {
        annotatedSteps: {
          clearRedo,
          hasNextStep,
          latest: {
            annotations
          }
        },
        classifications: {
          completeClassification
        },
        workflowSteps: {
          active: step
        }
      }
    } = props.store || useContext(MobXProviderContext)

    if (hasNextStep) {
      return null
    }

    function completeStepTasks() {
      step.tasks.forEach((task) => {
        const [ annotation ] = annotations.filter(annotation => annotation.task === task.taskKey)
        task.complete(annotation)
      })
    }

    function onClick(event) {
      event.preventDefault()
      completeStepTasks()
      clearRedo()
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
