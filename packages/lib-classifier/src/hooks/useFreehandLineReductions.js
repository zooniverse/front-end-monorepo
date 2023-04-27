import { useEffect, useState } from 'react'

import SHOWN_MARKS from '@helpers/shownMarks'
import { useStores } from '@hooks'
import { useCaesarReductions } from './'
import cuid from 'cuid'

export default function useFreehandLineReductions() {
  const {
    subjects: {
      active: {
        stepHistory
      }
    },
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

  const points = caesarReductions?.consensusLines(frame)
  const activeStepAnnotations = stepHistory?.latest.annotations

  // We expect there to only be one
  const [task] = findTasksByType('drawing')

  // We want to observe the marks array for changes, so pass that as a separate prop.
  const marks = task?.marks

  // find the corresponding annotation
  const annotation = activeStepAnnotations.find(
    annotation => annotation.task === task?.taskKey
  )

  if (marks.length === 0 && points) {
    task.activeTool.createMark({
      frame: 0,
      id: cuid(),
      toolIndex: 0,
      points: points[0],
      pathX: points.pathX,
      pathY: points.pathY
    })
  }
  
  const invalidMark = !step?.isValid
  const visible = workflow?.usesFreehandLineTool &&
    loaded &&
    task?.shownMarks === SHOWN_MARKS.ALL &&
    points.length > 0

  return {
    annotation,
    frame,
    invalidMark,
    points,
    marks,
    task,
    visible,
    workflow
  }
}