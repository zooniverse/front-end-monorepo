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

  // NOTE: useFreehandLineReductions() and useTranscriptionReductions() are called regardless of reducer key
  if (workflow.caesarReducer !== 'machine-learnt') return

  const { loaded, caesarReductions } = useCaesarReductions(workflow.caesarReducer)

  const caesarMark = caesarReductions?.findCurrentTaskMark({
    stepKey: step.stepKey,
    tasks: step.tasks,
    frame,
  })

  let task = step?.tasks[caesarMark?.taskIndex]
  let tool = task?.tools[caesarMark?.toolIndex]
  let marks = tool?.marks;
  let marksjson = marks?.toJSON()

  if (marks && caesarMark && marksjson[caesarMark.markId] === undefined) {
    tool.createMark({
      frame: caesarMark.frame,
      id: caesarMark.markId,
      toolIndex: caesarMark.toolIndex,
      pathX: caesarMark.pathX,
      pathY: caesarMark.pathY
    })
  }

  const [drawingTask] = findTasksByType('drawing')
  const drawingMarks = drawingTask?.marks

  return {
    task: drawingTask,
    marks: drawingMarks,
  }
}