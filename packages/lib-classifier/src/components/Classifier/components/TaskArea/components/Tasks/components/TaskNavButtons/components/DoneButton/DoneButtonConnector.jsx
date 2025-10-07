import { observer } from 'mobx-react'

import { useStores } from '@hooks'
import DoneButton from './DoneButton'

function storeMapper(classifierStore) {
  const {
    subjects: {
      active: subject
    },
    classifications: {
      completeClassification
    },
    workflowSteps: {
      active: step,
      hasUnsupportedTasks
    }
  } = classifierStore

  if (subject?.stepHistory) { // stepHistory is not ready while subject is loading
    const { finish, hasNextStep, latest } = subject.stepHistory
    const annotations = latest?.annotations

    function onClick(event) {
      event.preventDefault()
      step.completeAndValidate(annotations)
      finish()

      requestAnimationFrame(() => {
        const taskArea = document.querySelector('.classifier-task-area')
        taskArea?.focus()
        if (taskArea?.getBoundingClientRect().top < 0) {
          taskArea.scrollIntoView({ block: 'start' })
        }
      })

      return completeClassification({ doneAndTalk: false })
    }

    return {
      disabled: hasUnsupportedTasks,
      hasNextStep,
      onClick
    }
  }

  return {}
}

function DoneButtonConnector(props) {
  const { disabled, hasNextStep, onClick } = useStores(storeMapper)
  const isDisabled = disabled || props.disabled

  return hasNextStep ? null : <DoneButton {...props} disabled={isDisabled} onClick={onClick} />
}

export default observer(DoneButtonConnector)
