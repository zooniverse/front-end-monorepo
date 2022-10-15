import React from 'react'
import asyncStates from '@zooniverse/async-states'
import PropTypes from 'prop-types'
import { withStores } from '@helpers'

import locationValidator from '../../helpers/locationValidator'
import useSubjectImage from '../SingleImageViewer/hooks/useSubjectImage'
import FlipbookViewer from './FlipbookViewer'

function storeMapper(store) {
  const { frame: defaultFrame } = store.subjectViewer

  return {
    defaultFrame
  }
}

function FlipbookViewerContainer({
  defaultFrame = 0,
  loadingState = asyncStates.initialized,
  onError = () => true,
  onReady = () => true,
  subject
}) {
  /** This initializes an image element from the subject's defaultFrame src url.
   * We do this so the SVGPanZoom has dimensions of the subject image.
   * We're assuming all frames in one subject have the same dimensions. */
  const defaultFrameUrl = subject ? Object.values(subject.locations[defaultFrame])[0] : null
  const { img, error } = useSubjectImage(window.Image, defaultFrameUrl)
  const { naturalHeight, naturalWidth, src: defaultFrameSrc } = img

  if (error) {
    console.error(error)
    onError(error)
  }

  if (loadingState === asyncStates.error || !subject?.locations) {
    return <div>Something went wrong.</div>
  }

  return (
    <FlipbookViewer
      defaultFrame={defaultFrame}
      defaultFrameSrc={defaultFrameSrc}
      naturalHeight={naturalHeight}
      naturalWidth={naturalWidth}
      onError={onError}
      onReady={onReady}
      subject={subject}
    />
  )
}

FlipbookViewerContainer.propTypes = {
  defaultFrame: PropTypes.number,
  loadingState: PropTypes.string,
  onError: PropTypes.func,
  onReady: PropTypes.func,
  subject: PropTypes.shape({
    locations: PropTypes.arrayOf(locationValidator)
  }).isRequired
}

export default withStores(FlipbookViewerContainer, storeMapper)
export { FlipbookViewerContainer }
