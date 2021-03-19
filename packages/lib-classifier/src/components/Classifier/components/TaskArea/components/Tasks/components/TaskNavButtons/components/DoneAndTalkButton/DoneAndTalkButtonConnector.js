import { MobXProviderContext, observer } from 'mobx-react'
import React, { useContext } from 'react'

import DoneAndTalkButton from './DoneAndTalkButton'

function withStores(Component) {
  function DoneAndTalkButtonConnector(props) {
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
        subjects: {
          active: subject
        },
        workflowSteps: {
          active: step,
          shouldWeShowDoneAndTalkButton
        }
      }
    } = props.store || useContext(MobXProviderContext)

    if (!hasNextStep && shouldWeShowDoneAndTalkButton && subject.id) {
      function completeStepTasks() {
        step.tasks.forEach((task) => {
          const [ annotation ] = annotations.filter(annotation => annotation.task === task.taskKey)
          task.complete(annotation)
        })
      }

      function onClick(event) {
        event.preventDefault()
        const isCmdClick = event.metaKey
        subject.openInTalk(isCmdClick)
        completeStepTasks()
        clearRedo()
        return completeClassification()
      }

      return (
        <Component
          onClick={onClick}
          {...props}
        />
      )
    }

    return null
  }
  return observer(DoneAndTalkButtonConnector)
}

export default withStores(DoneAndTalkButton)
