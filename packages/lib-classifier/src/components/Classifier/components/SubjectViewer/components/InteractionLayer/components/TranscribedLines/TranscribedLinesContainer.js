import React from 'react'
import PropTypes from 'prop-types'
import { MobXProviderContext, observer } from 'mobx-react'
import TranscribedLines from './TranscribedLines'

function useStores () {
  const stores = React.useContext(MobXProviderContext)
  const {
    active: workflow
  } = stores.classifierStore.workflows
  const {
    activeStepTasks
  } = stores.classifierStore.workflowSteps
  const subject = stores.classifierStore.subjects.active
  const { consensusLines } = subject.transcriptionReductions || {}
  const [activeTranscriptionTask] = activeStepTasks.filter(task => task.type === 'transcription')
  return { activeTranscriptionTask, consensusLines, workflow }
}

function TranscribedLinesContainer ({ scale = 1 }) {
  const { 
    activeTranscriptionTask = {},
    consensusLines = [], 
    workflow = {
      usesTranscriptionTask: false
    }
  } = useStores()

  if (workflow?.usesTranscriptionTask) {
    return (
      <TranscribedLines
        lines={consensusLines}
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