import { useEffect, useState } from 'react';
import { Box } from 'grommet'
import PropTypes from 'prop-types'

import locationValidator from '../../helpers/locationValidator'
import { useSubjectImage } from '@hooks'

import SingleImageViewer from '../SingleImageViewer/SingleImageViewer.js'
import SVGImage from '../SVGComponents/SVGImage'
import SVGPanZoom from '../SVGComponents/SVGPanZoom'
import FlipbookControls from './components'

const DEFAULT_HANDLER = () => true

const FlipbookViewer = ({
  defaultFrame = 0,
	enableInteractionLayer = false,
  enableRotation = DEFAULT_HANDLER,
  flipbookAutoplay = false,
  invert = false,
  limitSubjectHeight = false,
  move,
  onError = DEFAULT_HANDLER,
  onKeyDown = DEFAULT_HANDLER,
  onReady = DEFAULT_HANDLER,
  playIterations,
  rotation,
  setOnPan = DEFAULT_HANDLER,
  setOnZoom = DEFAULT_HANDLER,
  subject
}) => {
  const [currentFrame, setCurrentFrame] = useState(defaultFrame)
  const [playing, setPlaying] = useState(false)
  const [dragMove, setDragMove] = useState()
  /** This initializes an image element from the subject's defaultFrame src url.
   * We do this so the SVGPanZoom has dimensions of the subject image.
   * We're assuming all frames in one subject have the same dimensions. */
  const defaultFrameLocation = subject ? subject.locations[defaultFrame] : null
  const { img, error, loading, subjectImage } = useSubjectImage({
    src: defaultFrameLocation.url,
    onReady,
    onError
  })
  const {
    naturalHeight = 600,
    naturalWidth = 800
  } = img

  const viewerLocation = subject?.locations ? subject.locations[currentFrame] : ''

  useEffect(() => {
    enableRotation()
  }, [img.src])

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!reducedMotionQuery.matches && flipbookAutoplay) {
      setPlaying(true)
    }
  }, [])

  const onPlayPause = () => {
    setPlaying(!playing)
  }

  const handleSpaceBar = (event) => {
    if (event.key === ' ') {
      event.preventDefault()
      onPlayPause()
    } else {
      onKeyDown(event)
    }
  }

  const setOnDrag = (callback) => {
    setDragMove(() => callback)
  }

  const onDrag = (event, difference) => {
    dragMove?.(event, difference)
  }

  return (
    <Box>
      <SVGPanZoom
        key={`${naturalWidth}-${naturalHeight}`}
        imgRef={subjectImage}
        limitSubjectHeight={limitSubjectHeight}
        maxZoom={5}
        minZoom={0.1}
        naturalHeight={naturalHeight}
        naturalWidth={naturalWidth}
        setOnDrag={setOnDrag}
        setOnPan={setOnPan}
        setOnZoom={setOnZoom}
        src={img.src}
      >
        <SingleImageViewer
          enableInteractionLayer={enableInteractionLayer}
          height={naturalHeight}
          limitSubjectHeight={limitSubjectHeight}
          onKeyDown={handleSpaceBar}
          rotate={rotation}
          width={naturalWidth}
        >
          <g role='tabpanel' id='flipbook-tab-panel'>
            <SVGImage
              ref={subjectImage}
              invert={invert}
              move={move}
              naturalHeight={naturalHeight}
              naturalWidth={naturalWidth}
              onDrag={onDrag}
              src={viewerLocation.url}
              subjectID={subject.id}
            />
          </g>
        </SingleImageViewer>
      </SVGPanZoom>
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
  limit_subject_height: PropTypes.bool,
  /** Passed from Subject Viewer Store */
  move: PropTypes.bool,
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
