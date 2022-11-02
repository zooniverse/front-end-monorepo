import React, { useEffect } from 'react'
import asyncStates from '@zooniverse/async-states'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

import { useStores } from '@hooks'
import locationValidator from '../../helpers/locationValidator'
import useSubjectImage from '../SingleImageViewer/hooks/useSubjectImage'
import FlipbookViewer from './FlipbookViewer'

function storeMapper(store) {
  const {
    enableRotation,
    frame: defaultFrame,
    invert,
    move,
    rotation,
    setFrame,
    setOnPan,
    setOnZoom
  } = store.subjectViewer
  const { playIterations } = store.workflows.active.configuration

  return {
    defaultFrame,
    enableRotation,
    invert,
    move,
    playIterations,
    rotation,
    setFrame,
    setOnPan,
    setOnZoom
  }
}

function FlipbookViewerContainer({
  loadingState = asyncStates.initialized,
  onError = () => true,
  onReady = () => true,
  subject
}) {
  const {
    defaultFrame,
    enableRotation,
    invert,
    move,
    rotation,
    playIterations,
    setOnPan,
    setOnZoom
  } = useStores(storeMapper)
  /** This initializes an image element from the subject's defaultFrame src url.
   * We do this so the SVGPanZoom has dimensions of the subject image.
   * We're assuming all frames in one subject have the same dimensions. */
  const defaultFrameUrl = subject ? Object.values(subject.locations[defaultFrame])[0] : null
  const { img, error, loading } = useSubjectImage(window.Image, defaultFrameUrl)
  const { naturalHeight, naturalWidth, src: defaultFrameSrc } = img

  useEffect(function logError() {
    if (!loading && error) {
      console.error(error)
      onError(error)
    }
  }, [error, loading])

  if (loadingState === asyncStates.error || !subject?.locations) {
    return <div>Something went wrong.</div>
  }

  return (
    <FlipbookViewer
      defaultFrame={defaultFrame}
      defaultFrameSrc={defaultFrameSrc}
      enableRotation={enableRotation}
      invert={invert}
      move={move}
      naturalHeight={naturalHeight}
      naturalWidth={naturalWidth}
      onReady={onReady}
      rotation={rotation}
      playIterations={playIterations}
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
  /** Passed from SubjectViewer and  dimensions are added to classification metadata. Called after svg layers successfully load with `defaultFrameSrc`. */
  onReady: PropTypes.func,
  /** Required. Passed from mobx store via SubjectViewer. */
  subject: PropTypes.shape({
    locations: PropTypes.arrayOf(locationValidator)
  }).isRequired
}

export default observer(FlipbookViewerContainer)
