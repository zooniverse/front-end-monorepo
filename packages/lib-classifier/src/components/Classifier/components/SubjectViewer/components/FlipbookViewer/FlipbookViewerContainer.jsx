import { useEffect } from 'react'
import asyncStates from '@zooniverse/async-states'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

import { useStores } from '@hooks'
import locationValidator from '../../helpers/locationValidator'
import FlipbookViewer from './FlipbookViewer'
import SeparateFramesViewer from '../SeparateFramesViewer/SeparateFramesViewer'

function storeMapper(store) {
  const {
    enableRotation,
    frame: defaultFrame,
    invert,
    move,
    rotation,
    separateFramesView,
    setOnPan,
    setOnZoom
  } = store.subjectViewer

  const {
    flipbook_autoplay: flipbookAutoplay,
    limit_subject_height: limitSubjectHeight,
    playIterations
  } = store.workflows?.active?.configuration

  return {
    defaultFrame,
    enableRotation,
    flipbookAutoplay,
    invert,
    limitSubjectHeight,
    move,
    playIterations,
    rotation,
    separateFramesView,
    setOnPan,
    setOnZoom
  }
}

const DEFAULT_HANDLER = () => true

function FlipbookViewerContainer({
  enableInteractionLayer = false,
  loadingState = asyncStates.initialized,
  onError = DEFAULT_HANDLER,
  onReady = DEFAULT_HANDLER,
  setOnPan: propSetOnPan = null,
  setOnZoom: propSetOnZoom = null,
  subject,
  zoomControlFn = null,
  zooming = true
}) {
  const {
    defaultFrame,
    enableRotation,
    flipbookAutoplay,
    invert,
    limitSubjectHeight,
    move,
    playIterations,
    rotation,
    separateFramesView,
    setOnZoom: storeSetOnZoom,
    setOnPan: storeSetOnPan,
  } = useStores(storeMapper)

  const effectiveSetOnPan = propSetOnPan || storeSetOnPan
  const effectiveSetOnZoom = propSetOnZoom || storeSetOnZoom

  useEffect(function preloadImages() {
    subject?.locations?.forEach(({ type, url }) => {
      if (url && type === 'image') {
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
          enableRotation={enableRotation}
          onError={onError}
          onReady={onReady}
          subject={subject}
        />
      ) : (
        <FlipbookViewer
          defaultFrame={defaultFrame}
          enableInteractionLayer={enableInteractionLayer}
          enableRotation={enableRotation}
          flipbookAutoplay={flipbookAutoplay}
          invert={invert}
          limitSubjectHeight={limitSubjectHeight}
          move={move}
          onError={onError}
          onReady={onReady}
          playIterations={playIterations}
          rotation={rotation}
          setOnPan={effectiveSetOnPan}
          setOnZoom={effectiveSetOnZoom}
          subject={subject}
          zoomControlFn={zoomControlFn}
          zooming={zooming}
        />
      )}
    </>
  )
}

FlipbookViewerContainer.propTypes = {
  /** Determined per mobx store WorkflowStepStore via SubjectViewer. */
  enableInteractionLayer: PropTypes.bool,
  /** @zooniverse/async-states */
  loadingState: PropTypes.string,
  /** Passed from SubjectViewer and called if `useSubjectImage()` hook fails. */
  onError: PropTypes.func,
  /** Passed from SubjectViewer and dimensions are added to classification metadata. Called after svg layers successfully load with `defaultFrameSrc`. */
  onReady: PropTypes.func,
  /** OPTIONAL: only supply this function if you want to override the setOnPan function from the store. (As of Apr 2026, only used by DataImageViewer.) */
  setOnPan: PropTypes.func,
  /** OPTIONAL: only supply this function if you want to override the setOnZoom function from the store. (As of Apr 2026, only used by DataImageViewer.) */
  setOnZoom: PropTypes.func,
  /** Required. Passed from mobx store via SubjectViewer. */
  subject: PropTypes.shape({
    locations: PropTypes.arrayOf(locationValidator)
  }).isRequired,
  /** OPTIONAL: only supply zoomControlFn and zooming if you want to allow users to manually enable/disable zoom & pan functionality. (As of Apr 2026, only used by DataImageViewer.) */
  zoomControlFn: PropTypes.func,
  /** OPTIONAL: see zoomControlFn. */
  zooming: PropTypes.bool
}

export default observer(FlipbookViewerContainer)
