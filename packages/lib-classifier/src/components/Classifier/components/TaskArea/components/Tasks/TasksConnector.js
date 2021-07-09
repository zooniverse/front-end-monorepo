import React, { useContext } from 'react'
import { MobXProviderContext, observer } from 'mobx-react'

import Tasks from './Tasks'

function TasksConnector(props) {
  const { classifierStore } = useContext(MobXProviderContext)
  const {
    annotatedSteps: {
      latest
    },
    classifications: {
      active: classification,
      demoMode
    },
    subjectViewer: {
      loadingState: subjectReadyState
    },
    workflows: {
      loadingState
    },
    workflowSteps: {
      active: step,
      isThereTaskHelp
    }
  } = classifierStore

  let isComplete
  // wait for the step and the classification before calculating isComplete from annotations.
  if (step && classification) {
    isComplete = step.isComplete(latest.annotations)
  }

  return (
    <Tasks
      classification={classification}
      demoMode={demoMode}
      isComplete={isComplete}
      isThereTaskHelp={isThereTaskHelp}
      loadingState={loadingState}
      step={step}
      subjectReadyState={subjectReadyState}
      {...props}
    />
  )
}

export default observer(TasksConnector)
