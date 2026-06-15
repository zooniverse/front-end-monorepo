import { Box } from 'grommet'
import { arrayOf, bool, func, number, shape, string } from 'prop-types'
import asyncStates from '@zooniverse/async-states'

import locationValidator from '../../helpers/locationValidator'
import ImageAndTextControls from './components/ImageAndTextControls'
import SeparateFramesViewer from '../SeparateFramesViewer/SeparateFramesViewer'
import SingleImageViewer from '../SingleImageViewer'
import SingleTextViewer from '../SingleTextViewer'

const DEFAULT_DIMENSIONS = [
  {
    clientHeight: 400
  }
]

const DEFAULT_HANDLER = () => true

function ImageAndTextViewerContainer({
  dimensions = DEFAULT_DIMENSIONS,
  enableSwitchView = false,
  frame = 0,
  loadingState = asyncStates.initialized,
  onError = DEFAULT_HANDLER,
  onReady = DEFAULT_HANDLER,
  setFrame = DEFAULT_HANDLER,
  separateFramesView = false,
  subject
}) {
  function handleFrameChange(newFrame) {
    setFrame(newFrame)
  }

  if (loadingState === asyncStates.error) {
    return <div>Something went wrong.</div>
  }

  const { type } = subject.locations[frame]


  // Note that enableInteractionLayer is false for this subject type. There's no reason we can't
  // enable drawing tools on top of an ImageAndText subject, but at that point it might be worth
  // feeding this subject type into the FlipbookViewer, and modifying FlipbookControls as needed.
  if (loadingState !== asyncStates.initialized) {
    return (
      <>
        {separateFramesView ? (
          <SeparateFramesViewer
            enableInteractionLayer={false}
            onError={onError}
            onReady={onReady}
            subject={subject}
          />
        ) : (
          <Box>
            {type === 'text' ? (
              <SingleTextViewer
                height={dimensions[0]?.clientHeight ?? ''}
                onError={onError}
                onReady={onReady}
              />
            ) : (
              <SingleImageViewer
                enableInteractionLayer={false}
                loadingState={loadingState}
                onError={onError}
                onReady={onReady}
              />
            )}
            <ImageAndTextControls
              currentFrame={frame}
              enableSwitchView={enableSwitchView}
              locations={subject.locations}
              onFrameChange={handleFrameChange}
            />
          </Box>
        )}
      </>
    )
  }
  return null
}

ImageAndTextViewerContainer.propTypes = {
  dimensions: arrayOf(
    shape({
      clientHeight: number
    })
  ),
  enableSwitchView: bool,
  frame: number,
  limitSubjectHeight: bool,
  loadingState: string,
  onError: func,
  onReady: func,
  separateFramesView: bool,
  setFrame: func,
  subject: shape({
    locations: arrayOf(locationValidator)
  })
}

export default ImageAndTextViewerContainer
