import { Box } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import asyncStates from '@zooniverse/async-states'

import locationValidator from '../../helpers/locationValidator'
import SingleImageViewer from '../SingleImageViewer'
import SingleTextViewer from '../SingleTextViewer'
import StepNavigation from '@components/Classifier/components/SlideTutorial/components/StepNavigation'

function ImageAndTextViewerContainer ({
  frame = 0,
  loadingState = asyncStates.initialized,
  setFrame = () => true,
  subject
}) {
  function handleFrameChange (newFrame) {
    setFrame(newFrame)
  }

  if (loadingState === asyncStates.error) {
    return (
      <div>Something went wrong.</div>
    )
  }

  const [mimeType] = Object.keys(subject.locations[frame])
  const imageTypes = [
    'image/png',
    'image/jpeg',
    'image/gif'
  ]

  if (loadingState !== asyncStates.initialized) {
    if (imageTypes.includes(mimeType)) {
      return (
        <Box
          fill='horizontal'
        >
          <SingleImageViewer
            enableInteractionLayer={false}
            loadingState={loadingState}
          />
          <StepNavigation
            onChange={handleFrameChange}
            stepIndex={frame}
            steps={[0, 1]}
          />
        </Box>
      )
    }
    if (mimeType === 'text/plain') {
      return (
        <Box
          fill='horizontal'
        >
          <SingleTextViewer />
          <StepNavigation
            onChange={handleFrameChange}
            stepIndex={frame}
            steps={[0, 1]}
          />
        </Box>
      )
    }
  }
  return null
}

ImageAndTextViewerContainer.propTypes = {
  frame: PropTypes.number,
  loadingState: PropTypes.string,
  setFrame: PropTypes.func,
  subject: PropTypes.shape({
    locations: PropTypes.arrayOf(locationValidator)
  })
}

export default ImageAndTextViewerContainer
