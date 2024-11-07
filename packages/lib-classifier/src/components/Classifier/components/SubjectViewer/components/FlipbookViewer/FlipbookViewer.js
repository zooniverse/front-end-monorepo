import { useEffect, useState } from 'react';
import { Box } from 'grommet'
import PropTypes from 'prop-types'

import locationValidator from '../../helpers/locationValidator'

import SingleImageViewerContainer from '../SingleImageViewer/SingleImageViewerContainer'
import FlipbookControls from './components'

const DEFAULT_HANDLER = () => true

const FlipbookViewer = ({
  defaultFrame = 0,
  enableInteractionLayer = false,
  enableRotation = DEFAULT_HANDLER,
  flipbookAutoplay = false,
  invert = false,
  limitSubjectHeight = false,
  move = false,
  onError = DEFAULT_HANDLER,
  onReady = DEFAULT_HANDLER,
  playIterations,
  rotation = 0,
  setOnPan = DEFAULT_HANDLER,
  setOnZoom = DEFAULT_HANDLER,
  subject
}) => {
  const [currentFrame, setCurrentFrame] = useState(defaultFrame)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!reducedMotionQuery.matches && flipbookAutoplay) {
      setPlaying(true)
    }
  }, [])

  const onPlayPause = () => {
    setPlaying(!playing)
  }

  // TODO: refactor for handleSpaceBar
  const handleSpaceBar = (event) => {
    if (event.key === ' ') {
      event.preventDefault()
      onPlayPause()
    } else {
      onKeyDown(event)
    }
  }

  return (
    <Box>
      <SingleImageViewerContainer
        enableInteractionLayer={enableInteractionLayer}
        enableRotation={enableRotation}
        frame={currentFrame}
        invert={invert}
        limitSubjectHeight={limitSubjectHeight}
        move={move}
        onError={onError}
        onReady={onReady}
        rotation={rotation}
        setOnPan={setOnPan}
        setOnZoom={setOnZoom}
        subject={subject}
      />
      <FlipbookControls
        currentFrame={currentFrame}
        locations={subject.locations}
        onFrameChange={setCurrentFrame}
        onPlayPause={onPlayPause}
        playing={playing}
        playIterations={playIterations}
      />
    </Box>
  )
}

FlipbookViewer.propTypes = {
  /** Fetched from metadata.default_frame or initialized to zero */
  defaultFrame: PropTypes.number,
  /** Passed from Subject Viewer Store */
  enableInteractionLayer: PropTypes.bool,
  /** Function passed from Subject Viewer Store */
  enableRotation: PropTypes.func,
  /** Fetched from workflow configuration. Determines whether to autoplay the loop on viewer load */
  flipbookAutoplay: PropTypes.bool,
  /** Passed from Subject Viewer Store */
  invert: PropTypes.bool,
  /** Passed from Subject Viewer Store */
  limitSubjectHeight: PropTypes.bool,
  /** Passed from Subject Viewer Store */
  move: PropTypes.bool,
  /** Passed from Subject Viewer Store */
  onError: PropTypes.func,
  /** Passed from Subject Viewer Store */
  onFrameChange: PropTypes.func,
  /** withKeyZoom() is for using keyboard pan and zoom controls while focused on the subject image */
  onKeyDown: PropTypes.func,
  /** Passed from Subject Viewer Store and called when default frame's src is loaded */
  onReady: PropTypes.func,
  /** Fetched from workflow configuration. Number preference for how many loops to play */
  playIterations: PropTypes.number,
  /** Passed from the subject viewer store. Needed in SingleImageViewer to handle transforming (rotating) the image */
  rotation: PropTypes.number,
  /** Passed from the Subject Viewer Store */
  setOnPan: PropTypes.func,
  /** Passed from the Subject Viewer Store */
  setOnZoom: PropTypes.func,
  /** Required. Passed from SubjectViewer component */
  subject: PropTypes.shape({
    locations: PropTypes.arrayOf(locationValidator)
  }).isRequired
}

export default FlipbookViewer
