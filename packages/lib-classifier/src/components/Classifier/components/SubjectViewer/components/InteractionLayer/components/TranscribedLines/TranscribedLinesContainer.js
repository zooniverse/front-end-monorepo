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
  const {
    activeStepTasks
  } = stores.classifierStore.workflowSteps
  const subject = stores.classifierStore.subjects.active
  const { consensusLines } = subject.transcriptionReductions || {}
  const [activeTranscriptionTask] = activeStepTasks.filter(task => task.type === 'transcription')
  return { activeTranscriptionTask, consensusLines, frame, workflow }
}

function TranscribedLinesContainer ({ scale = 1 }) {
  const { 
    activeTranscriptionTask = {},
    frame = 0,
    consensusLines = [], 
    workflow = {
      usesTranscriptionTask: false
    }
  } = useStores()

  const { shownMarks } = activeTranscriptionTask
  const visibleLinesPerFrame = consensusLines.filter(line => line.frame === frame)

  if (workflow?.usesTranscriptionTask && shownMarks === SHOWN_MARKS.ALL && visibleLinesPerFrame.length > 0) {
    return (
      <TranscribedLines
        lines={visibleLinesPerFrame}
        scale={scale}
        task={activeTranscriptionTask}
      />
    )
  }

  return null
}

TranscribedLinesContainer.propTypes = {
  scale: PropTypes.number
}

export default observer(TranscribedLinesContainer)