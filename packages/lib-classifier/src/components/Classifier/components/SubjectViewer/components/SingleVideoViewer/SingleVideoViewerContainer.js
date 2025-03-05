import { arrayOf, func, shape, string} from 'prop-types'
import { MobXProviderContext } from 'mobx-react'
import { useContext } from 'react'
import asyncStates from '@zooniverse/async-states'

import locationValidator from '../../helpers/locationValidator'
import VideoViewer from './components/VideoViewer/VideoViewer.js'
import VideoWithDrawing from './components/VideoWithDrawing/VideoWithDrawing.js'

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
        <VideoWithDrawing
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
  loadingState: string,
  onError: func,
  onKeyDown: func,
  onReady: func,
  subject: shape({
    locations: arrayOf(locationValidator)
  })
}

export default SingleVideoViewerContainer
