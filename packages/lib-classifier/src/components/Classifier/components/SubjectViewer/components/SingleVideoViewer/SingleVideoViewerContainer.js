import PropTypes from 'prop-types'
import { MobXProviderContext } from 'mobx-react'
import { useContext } from 'react'
import asyncStates from '@zooniverse/async-states'

import locationValidator from '../../helpers/locationValidator'
import VideoViewer from './components/VideoViewer/VideoViewer.js'
import VideoWithInteraction from './components/VideoWithInteraction/VideoWithInteraction.js'

function useDrawingTask() {
  const store = useContext(MobXProviderContext)?.classifierStore
  const drawingTasks = store?.workflowSteps.findTasksByType('drawing')
  return !!drawingTasks?.length
}

function SingleVideoViewerContainer({
  loadingState = asyncStates.initialized,
  onError = () => true,
  onReady = () => true,
  onKeyDown = () => true,
  subject
}) {
  const enableInteractionLayer = useDrawingTask()

  return (
    <>
      {enableInteractionLayer ? (
        <VideoWithInteraction
          loadingState={loadingState}
          onError={onError}
          onReady={onReady}
          onKeyDown={onKeyDown}
          subject={subject}
        />
      ) : (
        <VideoViewer
          onError={onError}
          onReady={onReady}
          subject={subject}
        />
      )}
    </>
  )
}

SingleVideoViewerContainer.propTypes = {
  loadingState: PropTypes.string,
  onError: PropTypes.func,
  onKeyDown: PropTypes.func,
  onReady: PropTypes.func,
  subject: PropTypes.shape({
    locations: PropTypes.arrayOf(locationValidator)
  })
}

export default SingleVideoViewerContainer
