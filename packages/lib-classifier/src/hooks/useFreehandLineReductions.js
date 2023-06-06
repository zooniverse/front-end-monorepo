import { getType } from 'mobx-state-tree'
import { useStores } from '@hooks'
import { useCaesarReductions } from './'

export default function useFreehandLineReductions() {
  const {
    subjectViewer: {
      frame
    },
    workflows: {
      active: workflow
    },
    workflowSteps: {
      active: step,
      findTasksByType
    }
  } = useStores()

  const { loaded, caesarReductions } = useCaesarReductions(workflow.caesarReducer)

  if (loaded && getType(caesarReductions).name === 'FreehandLineReductions') {
    const caesarMark = caesarReductions.findCurrentTaskMark({
      stepKey: step.stepKey,
      tasks: step.tasks,
      frame,
    })

    if (caesarMark) {
      const { frame, markId: id, taskIndex, toolIndex, pathX, pathY } = caesarMark
      const task = step?.tasks[taskIndex]
      const tool = task?.tools[toolIndex]

      if (tool && !tool.marks.has(id) && caesarReductions.isUsed === false) {
        caesarReductions.setIsUsed()
        tool.createMark({ frame, id, toolIndex, pathX, pathY })
      }
    }
  }

  const [drawingTask] = findTasksByType('drawing')

  return {
    task: drawingTask
  }
}