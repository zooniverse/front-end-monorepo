import React from 'react'
import asyncStates from '@zooniverse/async-states'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

import { useStores } from '@hooks'
import locationValidator from '../../helpers/locationValidator'
import useSubjectImage from '../SingleImageViewer/hooks/useSubjectImage'
import FlipbookViewer from './FlipbookViewer'

function storeMapper (store) {
  const { frame: defaultFrame } = store.subjectViewer
  return {
    defaultFrame
  }
}

function FlipbookViewerContainer({
  loadingState = asyncStates.initialized,
  onError = () => true,
  onReady = () => true,
  subject
}) {
  const { defaultFrame } = useStores(storeMapper)
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
