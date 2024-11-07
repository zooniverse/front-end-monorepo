import { useEffect } from 'react'
import asyncStates from '@zooniverse/async-states'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

import { useKeyZoom, useStores } from '@hooks'
import locationValidator from '../../helpers/locationValidator'
import FlipbookViewer from './FlipbookViewer'
import SeparateFramesViewer from '../SeparateFramesViewer/SeparateFramesViewer'

function storeMapper(store) {
  const {
    frame: defaultFrame,
    resetView,
    separateFramesView
  } = store.subjectViewer

  const { activeStepTasks } = store.workflowSteps

  const [activeInteractionTask] = activeStepTasks.filter(
    (task) => task.type === 'drawing' || task.type === 'transcription'
  )
  const {
    activeTool
  } = activeInteractionTask || {}

  const {
    flipbook_autoplay: flipbookAutoplay,
    playIterations
  } = store.workflows?.active?.configuration

  return {
    activeTool,
    defaultFrame,
    flipbookAutoplay,
    playIterations,
    resetView,
    separateFramesView
  }
}

const DEFAULT_HANDLER = () => true

function FlipbookViewerContainer({
  enableInteractionLayer = false,
  loadingState = asyncStates.initialized,
  onError = DEFAULT_HANDLER,
  onReady = DEFAULT_HANDLER,
  subject
}) {
  const {
    activeTool,
    defaultFrame,
    flipbookAutoplay,
    playIterations,
    resetView,
    separateFramesView
  } = useStores(storeMapper)

  useEffect(function preloadImages() {
    subject?.locations?.forEach(({ url }) => {
      if (url) {
        const { Image } = window
        const img = new Image()
        img.src = url
      }
    })
    }, [subject?.locations])

  if (loadingState === asyncStates.error || !subject?.locations) {
    return <div>Something went wrong.</div>
  }

  return (
    <>
      {separateFramesView ? (
        <SeparateFramesViewer
          enableInteractionLayer={enableInteractionLayer}
          onError={onError}
          onReady={onReady}
          subject={subject}
        />
      ) : (
        <FlipbookViewer
          activeTool={activeTool}
          defaultFrame={defaultFrame}
          enableInteractionLayer={enableInteractionLayer}
          flipbookAutoplay={flipbookAutoplay}
          onError={onError}
          onReady={onReady}
          playIterations={playIterations}
          resetView={resetView}
          subject={subject}
        />
      )}
    </>
  )
}

FlipbookViewerContainer.propTypes = {
  /** Passed from Subject Viewer Store */
  enableInteractionLayer: PropTypes.bool,
  /** @zooniverse/async-states */
  loadingState: PropTypes.string,
  /** Passed from SubjectViewer and called if `useSubjectImage()` hook fails. */
  onError: PropTypes.func,
  /** Passed from SubjectViewer and dimensions are added to classification metadata. Called after svg layers successfully load with `defaultFrameSrc`. */
  onReady: PropTypes.func,
  /** Required. Passed from mobx store via SubjectViewer. */
  subject: PropTypes.shape({
    locations: PropTypes.arrayOf(locationValidator)
  }).isRequired
}

export default observer(FlipbookViewerContainer)
