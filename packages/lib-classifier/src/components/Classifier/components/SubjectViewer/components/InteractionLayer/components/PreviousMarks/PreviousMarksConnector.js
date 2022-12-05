import { useContext } from 'react';
import PropTypes from 'prop-types'
import { MobXProviderContext, observer } from 'mobx-react'
import PreviousMarks from './PreviousMarks'

function useStores() {
  const stores = useContext(MobXProviderContext)
  const { activeInteractionTask, interactionTask } = stores.classifierStore.workflowSteps
  const {
    active: classification
  } = stores.classifierStore.classifications
  const previousAnnotations = classification?.previousInteractionTaskAnnotations(activeInteractionTask.taskKey) || []
  const {
    frame
  } = stores.classifierStore.subjectViewer
  return { frame, interactionTask, previousAnnotations }
}

function PreviousMarksConnector({ scale, ...rest }) {
  const {
    frame = 0,
    interactionTask,
    previousAnnotations
  } = useStores()
  const { shownMarks } = interactionTask
  return (
    <PreviousMarks
      frame={frame}
      previousAnnotations={previousAnnotations}
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