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

  return { transcriptionTask, consensusLines, frame, workflow }
}

function TranscribedLinesContainer (props) {
  const { 
    transcriptionTask = {
      marks: []
    },
    frame = 0,
    consensusLines = [], 
    workflow = {
      usesTranscriptionTask: false
    }
  } = useStores()
  const {
    scale = 1
  } = props
  const { shownMarks } = transcriptionTask
  const visibleLinesPerFrame = consensusLines.filter(line => line.frame === frame)

  if (workflow?.usesTranscriptionTask && shownMarks === SHOWN_MARKS.ALL && visibleLinesPerFrame.length > 0) {
    return (
      <TranscribedLines
        lines={visibleLinesPerFrame}
        marks={transcriptionTask.marks}
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