import React from 'react'
import PropTypes from 'prop-types'
import { MobXProviderContext, observer } from 'mobx-react'
import PreviousMarks from './PreviousMarks'

function useStores() {
  const stores = React.useContext(MobXProviderContext)
  const { activeStepTasks, interactionTask } = stores.classifierStore.workflowSteps
  const [activeInteractionTask] = activeStepTasks.filter(task => task.type === 'drawing' || task.type === 'transcription')
  const {
    active: classification
  } = stores.classifierStore.classifications
  const interactionTaskAnnotations = classification?.interactionTaskAnnotations || []
  const previousTaskAnnotations = interactionTaskAnnotations.filter(annotation => annotation.task !== activeInteractionTask?.taskKey)
  const {
    frame
  } = stores.classifierStore.subjectViewer
  return { frame, interactionTask, previousTaskAnnotations }
}

function PreviousMarksConnector({ scale, ...rest }) {
  const {
    frame = 0,
    interactionTask,
    previousTaskAnnotations
  } = useStores()
  const { shownMarks } = interactionTask
  return (
    <PreviousMarks
      frame={frame}
      interactionTaskAnnotations={previousTaskAnnotations}
      scale={scale}
      shownMarks={shownMarks}
      {...rest}
    />
  )
}

PreviousMarksConnector.propTypes = {
  scale: PropTypes.number
}

export default observer(PreviousMarksConnector)