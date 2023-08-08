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
  loadingState = asyncStates.initialized,
  onError = DEFAULT_HANDLER,
  onReady = DEFAULT_HANDLER,
  subject
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
    setOnPan,
    setOnZoom
  } = useStores(storeMapper)

  const { onKeyZoom } = useKeyZoom()

  useEffect(
    function preloadImages() {
      subject?.locations?.forEach(({ url }) => {
        if (url) {
          const { Image } = window
          const img = new Image()
          img.src = url
        }
      })
    },
    [subject?.locations]
  )

  if (loadingState === asyncStates.error || !subject?.locations) {
    return <div>Something went wrong.</div>
  }

  return (
    <>
      {separateFramesView ? (
        <SeparateFramesViewer
          onError={onError}
          onReady={onReady}
          subject={subject}
        />
      ) : (
        <FlipbookViewer
          defaultFrame={defaultFrame}
          enableRotation={enableRotation}
          flipbookAutoplay={flipbookAutoplay}
          invert={invert}
          limitSubjectHeight={limitSubjectHeight}
          move={move}
          onError={onError}
          onKeyDown={onKeyZoom}
          onReady={onReady}
          playIterations={playIterations}
          rotation={rotation}
          setOnPan={setOnPan}
          setOnZoom={setOnZoom}
          subject={subject}
        />
      )}
    </>
  )
}

FlipbookViewerContainer.propTypes = {
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
