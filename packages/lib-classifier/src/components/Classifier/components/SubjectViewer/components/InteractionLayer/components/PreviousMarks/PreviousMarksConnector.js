import React from 'react'
import PropTypes from 'prop-types'
import { MobXProviderContext, observer } from 'mobx-react'
import PreviousMarks from './PreviousMarks'

function useStores() {
  const stores = React.useContext(MobXProviderContext)
  const { interactionTask } = stores.classifierStore.workflowSteps
  const {
    active: classification
  } = stores.classifierStore.classifications
  const interactionTaskAnnotations = classification?.interactionTaskAnnotations || []
  const {
    frame
  } = stores.classifierStore.subjectViewer
  return { frame, interactionTask, interactionTaskAnnotations }
}

function PreviousMarksConnector({ scale, ...rest }) {
  const {
    frame = 0,
    interactionTask,
    interactionTaskAnnotations
  } = useStores()
  const { shownMarks } = interactionTask
  return (
    <PreviousMarks
      frame={frame}
      interactionTaskAnnotations={interactionTaskAnnotations}
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