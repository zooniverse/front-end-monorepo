import { useEffect, useState } from 'react'

import SHOWN_MARKS from '@helpers/shownMarks'
import { useStores } from '@hooks'
import { useCaesarReductions } from './'

export default function useTranscriptionReductions() {
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

  const lines = caesarReductions?.consensusLines(frame)
  const activeStepAnnotations = stepHistory?.latest.annotations

  // We expect there to only be one
  const [task] = findTasksByType('transcription')
  // We want to observe the marks array for changes, so pass that as a separate prop.
  const marks = task?.marks
  // find the corresponding annotation
  const annotation = activeStepAnnotations.find(
    annotation => annotation.task === task?.taskKey
  )

  const invalidMark = !step?.isValid
  const visible = workflow?.usesTranscriptionTask &&
    loaded &&
    task?.shownMarks === SHOWN_MARKS.ALL &&
    lines.length > 0

  return {
    annotation,
    frame,
    invalidMark,
    lines,
    marks,
    task,
    visible,
    workflow
  }
}