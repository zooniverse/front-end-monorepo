import SHOWN_MARKS from '@helpers/shownMarks'

import { withStores } from '@helpers'
import TranscribedLines from './TranscribedLines'

function storeMapper(store) {
  const {
    subjects: {
      active: subject
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
  } = store

  const lines = subject.transcriptionReductions?.consensusLines(frame)
  const activeStepAnnotations = subject.stepHistory.latest.annotations

  // We expect there to only be one
  const [task] = findTasksByType('transcription')
  // We want to observe the marks array for changes, so pass that as a separate prop.
  const marks = task?.marks
  // find the corresponding annotation
  const annotation = activeStepAnnotations.find(
    annotation => annotation.task === task?.taskKey
  )

  const valid = step?.isValid
  const visible = workflow?.usesTranscriptionTask &&
    task?.shownMarks === SHOWN_MARKS.ALL &&
    lines.length > 0

  return {
    annotation,
    frame,
    invalidMark: !valid,
    lines,
    marks,
    task,
    visible,
    workflow
  }
}

export default withStores(TranscribedLines, storeMapper)
