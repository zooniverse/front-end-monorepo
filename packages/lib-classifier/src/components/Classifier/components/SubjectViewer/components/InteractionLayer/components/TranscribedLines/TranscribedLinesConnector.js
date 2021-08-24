import React from 'react'
import PropTypes from 'prop-types'
import { MobXProviderContext, observer } from 'mobx-react'
import SHOWN_MARKS from '@helpers/shownMarks'
import TranscribedLines from './TranscribedLines'

function useStores () {
  const stores = React.useContext(MobXProviderContext)
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
  } = stores.classifierStore

  const consensusLines = subject.transcriptionReductions?.consensusLines(frame) || []

  // We expect there to only be one
  const [transcriptionTask] = findTasksByType('transcription')
  // We want to observe the marks array for changes, so pass that as a separate prop.
  const marks = transcriptionTask?.marks

  const valid = step?.isValid
  return { 
    invalid: !valid,
    transcriptionTask,
    consensusLines,
    marks,
    workflow
  }
}

function TranscribedLinesConnector ({
  scale = 1
}) {
  const { 
    invalid = false,
    transcriptionTask = {},
    consensusLines = [],
    marks = [],
    workflow = {
      usesTranscriptionTask: false
    }
  } = useStores()
  const { shownMarks } = transcriptionTask

  if (workflow?.usesTranscriptionTask && shownMarks === SHOWN_MARKS.ALL && consensusLines.length > 0) {
    return (
      <TranscribedLines
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

TranscribedLinesConnector.propTypes = {
  scale: PropTypes.number
}

export default observer(TranscribedLinesConnector)