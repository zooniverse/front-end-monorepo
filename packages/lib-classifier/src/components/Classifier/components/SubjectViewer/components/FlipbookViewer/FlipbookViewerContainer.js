import { useEffect } from 'react'
import asyncStates from '@zooniverse/async-states'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

import withKeyZoom from '@components/Classifier/components/withKeyZoom'
import { useStores } from '@hooks'
import locationValidator from '../../helpers/locationValidator'
import FlipbookViewer from './FlipbookViewer'

function storeMapper(store) {
  const {
    enableRotation,
    frame: defaultFrame,
    invert,
    move,
    rotation,
    setOnPan,
    setOnZoom
  } = store.subjectViewer
  const { flipbook_autoplay: flipbookAutoplay, playIterations } = store.workflows.active.configuration

  return {
    defaultFrame,
    enableRotation,
    flipbookAutoplay,
    invert,
    move,
    playIterations,
    rotation,
    setOnPan,
    setOnZoom
  }
}

const DEFAULT_HANDLER = () => true

function FlipbookViewerContainer({
  loadingState = asyncStates.initialized,
  onError = DEFAULT_HANDLER,
  onKeyDown = DEFAULT_HANDLER,
  onReady = DEFAULT_HANDLER,
  subject
}) {
  const {
    defaultFrame,
    enableRotation,
    flipbookAutoplay,
    invert,
    move,
    playIterations,
    rotation,
    setOnPan,
    setOnZoom
  } = useStores(storeMapper)

  useEffect(function preloadImages() {
    subject?.locations?.forEach(location => {
      const [url] = Object.values(location)
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
    <FlipbookViewer
      defaultFrame={defaultFrame}
      enableRotation={enableRotation}
      flipbookAutoplay={flipbookAutoplay}
      invert={invert}
      move={move}
      onError={onError}
      onKeyDown={onKeyDown}
      onReady={onReady}
      playIterations={playIterations}
      rotation={rotation}
      setOnPan={setOnPan}
      setOnZoom={setOnZoom}
      subject={subject}
    />
  )
}

FlipbookViewerContainer.propTypes = {
  /** @zooniverse/async-states */
  loadingState: PropTypes.string,
  /** Passed from SubjectViewer and called if `useSubjectImage()` hook fails. */
  onError: PropTypes.func,
  /** withKeyZoom in for using keyboard pan and zoom controls while focused on the subject image */
  onKeyDown: PropTypes.func,
  /** Passed from SubjectViewer and dimensions are added to classification metadata. Called after svg layers successfully load with `defaultFrameSrc`. */
  onReady: PropTypes.func,
  /** Required. Passed from mobx store via SubjectViewer. */
  subject: PropTypes.shape({
    locations: PropTypes.arrayOf(locationValidator)
  }).isRequired
}

export default withKeyZoom(observer(FlipbookViewerContainer))
