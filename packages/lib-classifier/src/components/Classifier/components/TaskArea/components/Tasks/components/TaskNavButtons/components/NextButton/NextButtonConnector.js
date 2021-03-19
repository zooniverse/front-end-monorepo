import { MobXProviderContext, observer } from 'mobx-react'
import React, { useContext } from 'react'

import NextButton from './NextButton'

function withStores(Component) {
  function NextButtonConnector(props) {
    const {
      classifierStore: {
        annotatedSteps: {
          hasNextStep,
          latest: {
            annotations
          },
          next
        },
        workflowSteps: {
          active: step
        }
      }
    } = props.store || useContext(MobXProviderContext)

    if (!hasNextStep) {
      return null
    }

    function completeStepTasks() {
      step.tasks.forEach((task) => {
        const [ annotation ] = annotations.filter(annotation => annotation.task === task.taskKey)
        task.complete(annotation)
      })
    }

    function onClick() {
      completeStepTasks()
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
