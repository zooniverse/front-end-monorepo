import React from 'react'
import PropTypes from 'prop-types'
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

  const consensusLines = subject.transcriptionReductions?.consensusLines(frame)
  const activeStepAnnotations = subject.stepHistory.latest.annotations

  // We expect there to only be one
  const [transcriptionTask] = findTasksByType('transcription')
  // We want to observe the marks array for changes, so pass that as a separate prop.
  const marks = transcriptionTask?.marks
  // find the corresponding annotation
  const annotation = activeStepAnnotations.find(
    annotation => annotation.task === transcriptionTask?.taskKey
  )

  const valid = step?.isValid
  return {
    annotation,
    frame,
    invalid: !valid,
    transcriptionTask,
    consensusLines,
    marks,
    workflow
  }
}

const defaultWorkflow = {
  usesTranscriptionTask: false
}

function TranscribedLinesContainer ({
  annotation,
  frame,
  invalid = false,
  transcriptionTask = {},
  consensusLines = [],
  marks = [],
  scale = 1,
  workflow = defaultWorkflow
}) {
  const { shownMarks } = transcriptionTask

  if (workflow?.usesTranscriptionTask && shownMarks === SHOWN_MARKS.ALL && consensusLines.length > 0) {
    return (
      <TranscribedLines
        annotation={annotation}
        frame={frame}
        invalidMark={invalid}
        lines={consensusLines}
        marks={marks}
        scale={scale}
        task={transcriptionTask}
      />
    )
  }

  return null
}

TranscribedLinesContainer.propTypes = {
  scale: PropTypes.number
}

export default withStores(TranscribedLinesContainer, storeMapper)
