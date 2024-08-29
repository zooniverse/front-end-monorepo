import { getType } from 'mobx-state-tree'
import { useStores } from '@hooks'
import { useCaesarReductions } from './'

export default function useMachineLearntReductions() {
  const {
    workflows: {
      active: workflow
    },
    workflowSteps: {
      active: step,
      findTasksByType
    },
    subjects: {
      active: activeSubject,
    }
  } = useStores()

  const { loaded, caesarReductions } = useCaesarReductions(workflow.caesarReducer)
  const stepIndex = parseInt(step.stepKey.replace('S',''), 10)

  if (loaded
    && getType(caesarReductions).name === 'MachineLearntReductions'
    && activeSubject.caesarReductionsLoadedForStep[stepIndex] !== true) {
    
    // step.tasks is only the CURRENT TASK
    // Test project with 3 steps means we need to run this 3 times to check for reductions on each step
    // This is likely due to the potentially recursive nature of step navigation

    const caesarMarks = caesarReductions.findCurrentTaskMarks({
      stepKey: step.stepKey
    })
    
    if (caesarMarks) {
      caesarMarks.forEach(caesarMark => {
        const { stepKey, taskIndex, taskKey, taskType, toolType, ...newMark } = caesarMark
        newMark.id = newMark.markId;
        delete newMark.markId;

        const task = step?.tasks[0]	// we only get access to one task at a time in a step
        task?.activeTool.createMark(newMark)
      })
    }

    activeSubject.setCaesarReductionsLoadedForStep(stepIndex)
  }

  const [drawingTask] = findTasksByType('drawing')

  return {
    task: drawingTask
  }
}