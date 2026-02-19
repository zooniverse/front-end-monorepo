import { withStores } from '@helpers'
import TaskArea from './TaskArea'

function storeMapper(store) {
  const {
    subjects: {
      active: subject
    },
    tutorials: {
      disableTutorialTab,
      setActiveTutorial,
      tutorial
    },
    workflows: {
      active: workflow
    },
    workflowSteps: {
      active: step,
      steps
    }
  } = store

  let currentStepIndex = 1
  let totalSteps = 1

  if (step?.stepKey && steps) {
    const stepKeysArray = Array.from(steps.keys())
    const currentIndex = stepKeysArray.indexOf(step.stepKey)
    currentStepIndex = currentIndex + 1
    totalSteps = stepKeysArray.length
  }

  return {
    alreadySeen: subject?.alreadySeen,
    currentStepIndex,
    disableTutorialTab,
    setActiveTutorial,
    retired: subject?.retired,
    subject,
    totalSteps,
    tutorial,
    workflow
  }
}

export default withStores(TaskArea, storeMapper)
