import { arrayOf, func, shape, string } from 'prop-types'
import asyncStates from '@zooniverse/async-states'
import { observer } from 'mobx-react'

import { useStores } from '@hooks'
import locationValidator from '../../helpers/locationValidator'
import VideoViewer from './components/VideoViewer/VideoViewer.js'
import VideoWithDrawing from './components/VideoWithDrawing/VideoWithDrawing.js'

function storeMapper(store) {
  const drawingTasks = store.workflowSteps.findTasksByType('drawing')
  const { setVideoSpeed, setVolume, videoSpeed, volume } = store.subjectViewer

  return {
    enableInteractionLayer: !!drawingTasks?.length,
    setVideoSpeed,
    setVolume,
    videoSpeed,
    volume
  }
}

const DEFAULT_HANDLER = () => {}

function SingleVideoViewerContainer({
  loadingState = asyncStates.initialized,
  onError = DEFAULT_HANDLER,
  onReady = DEFAULT_HANDLER,
  onKeyDown = DEFAULT_HANDLER,
  subject
}) {
  const {
    enableInteractionLayer,
    setVideoSpeed,
    setVolume,
    videoSpeed,
    volume
  } = useStores(storeMapper)

  return (
    <>
      {enableInteractionLayer ? (
        <VideoWithDrawing
          loadingState={loadingState}
          onError={onError}
          onReady={onReady}
          onKeyDown={onKeyDown}
          setVideoSpeed={setVideoSpeed}
          setVolume={setVolume}
          subject={subject}
          volume={volume}
          videoSpeed={videoSpeed}
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

export default observer(SingleVideoViewerContainer)
