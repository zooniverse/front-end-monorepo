import { Box } from 'grommet'
import PropTypes from 'prop-types'
import asyncStates from '@zooniverse/async-states'

import locationValidator from '../../helpers/locationValidator'
import ImageAndTextControls from './components/ImageAndTextControls'
import SingleImageViewer from '../SingleImageViewer'
import SingleTextViewer from '../SingleTextViewer'

const defaultDimensions = [{
  clientHeight: 400
}]

function ImageAndTextViewerContainer ({
  dimensions = defaultDimensions,
  frame = 0,
  loadingState = asyncStates.initialized,
  onError = () => true,
  onReady = () => true,
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

  const { type } = subject.locations[frame]

  if (loadingState !== asyncStates.initialized) {
    return (
      <Box
        fill='horizontal'
      >
        {(type === 'text')
          ? (
            <SingleTextViewer
              height={dimensions[0]?.clientHeight ? `${dimensions[0]?.clientHeight}px` : ''}
              onError={onError}
              onReady={onReady}
            />)
          : (
            <SingleImageViewer
              enableInteractionLayer={false}
              loadingState={loadingState}
              onError={onError}
              onReady={onReady}
            />)}
        <ImageAndTextControls
          currentFrame={frame}
          locations={subject.locations}
          onFrameChange={handleFrameChange}
        />
      </Box>
    )
  }
  return null
}

ImageAndTextViewerContainer.propTypes = {
  dimensions: PropTypes.arrayOf(
    PropTypes.shape({
      clientHeight: PropTypes.number
    })
  ),
  frame: PropTypes.number,
  loadingState: PropTypes.string,
  setFrame: PropTypes.func,
  subject: PropTypes.shape({
    locations: PropTypes.arrayOf(locationValidator)
  })
}

export default ImageAndTextViewerContainer
