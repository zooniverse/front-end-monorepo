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
    frame,
    invert,
    move,
    rotation,
    separateFramesView,
    setFrame,
    setOnPan,
    setOnZoom
  } = store.subjectViewer

  const {
    flipbook_autoplay: flipbookAutoplay,
    limit_subject_height: limitSubjectHeight,
    playIterations
  } = store.workflows?.active?.configuration

  return {
    enableRotation,
    flipbookAutoplay,
    frame,
    invert,
    limitSubjectHeight,
    move,
    playIterations,
    rotation,
    separateFramesView,
    setFrame,
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
  subject
}) {
  const {
    enableRotation,
    flipbookAutoplay,
    frame,
    invert,
    limitSubjectHeight,
    move,
    playIterations,
    rotation,
    separateFramesView,
    setFrame,
    setOnPan,
    setOnZoom
  } = useStores(storeMapper)

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

  // Figure out the default frame for this Subject, which is usually 0 but can
  // be overridden by Subject metadata.
  // This code matches SubjectViewerStore.js's resetSubject()
  let defaultFrame = 0
  if (subject?.metadata?.default_frame > 0) {
    // To the research teams who set the default_frame value, the first item in a list is "1". Hence, we need to change that to Array index "0".
    defaultFrame = parseInt(subject.metadata.default_frame - 1)
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
          frame={frame}
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
          setFrame={setFrame}
          setOnPan={setOnPan}
          setOnZoom={setOnZoom}
          subject={subject}
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
  /** Required. Passed from mobx store via SubjectViewer. */
  subject: PropTypes.shape({
    locations: PropTypes.arrayOf(locationValidator)
  }).isRequired
}

export default observer(FlipbookViewerContainer)
