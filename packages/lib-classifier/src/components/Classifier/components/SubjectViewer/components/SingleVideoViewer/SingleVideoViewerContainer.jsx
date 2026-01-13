import { arrayOf, func, shape, string } from 'prop-types'
import asyncStates from '@zooniverse/async-states'
import { observer } from 'mobx-react'

import { useStores } from '@hooks'
import locationValidator from '../../helpers/locationValidator'
import VideoViewer from './components/VideoViewer/VideoViewer'
import VideoWithDrawing from './components/VideoWithDrawing/VideoWithDrawing'

function storeMapper(store) {
  const drawingTasks = store.workflowSteps.findTasksByType('drawing')

  const {
    subjectViewer: { invert, setVideoSpeed, setVolume, videoSpeed, volume },
    workflows: {
      active: {
        configuration: { limit_subject_height: limitSubjectHeight }
      }
    }
  } = store

  return {
    enableInteractionLayer: !!drawingTasks?.length,
    invert,
    limitSubjectHeight,
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
    invert,
    limitSubjectHeight,
    setVideoSpeed,
    setVolume,
    videoSpeed,
    volume
  } = useStores(storeMapper)

  return (
    <>
      {enableInteractionLayer ? (
        <VideoWithDrawing
          invert={invert}
          limitSubjectHeight={limitSubjectHeight}
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
          invert={invert}
          limitSubjectHeight={limitSubjectHeight}
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
