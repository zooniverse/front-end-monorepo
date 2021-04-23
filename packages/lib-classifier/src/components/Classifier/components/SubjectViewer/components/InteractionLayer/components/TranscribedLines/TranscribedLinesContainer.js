import React from 'react'
import PropTypes from 'prop-types'
import { MobXProviderContext, observer } from 'mobx-react'
import SHOWN_MARKS from '@helpers/shownMarks'
import TranscribedLines from './TranscribedLines'

function useStores () {
  const stores = React.useContext(MobXProviderContext)
  const { frame } = stores.classifierStore.subjectViewer
  const {
    active: workflow
  } = stores.classifierStore.workflows
  const subject = stores.classifierStore.subjects.active
  const { consensusLines } = subject.transcriptionReductions || {}

  // We expect there to only be one
  const [transcriptionTask] = stores.classifierStore.workflowSteps.findTasksByType('transcription')
  // We want to observe the marks array for changes, so pass that as a separate prop.
  const marks = transcriptionTask?.marks

  return { transcriptionTask, consensusLines, frame, marks, workflow }
}

function TranscribedLinesContainer ({
  scale = 1
}) {
  const { 
    transcriptionTask = {},
    frame = 0,
    consensusLines = [],
    marks = [],
    workflow = {
      usesTranscriptionTask: false
    }
  } = useStores()

  const { shownMarks } = transcriptionTask
  const visibleLinesPerFrame = consensusLines.filter(line => line.frame === frame)

  if (workflow?.usesTranscriptionTask && shownMarks === SHOWN_MARKS.ALL && visibleLinesPerFrame.length > 0) {
    return (
      <TranscribedLines
        lines={visibleLinesPerFrame}
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

export default observer(TranscribedLinesContainer)