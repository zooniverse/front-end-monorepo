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
  enableRotation = DEFAULT_HANDLER,
  flipbookAutoplay = false,
  invert = false,
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
  const defaultFrameUrl = subject ? Object.values(subject.locations[defaultFrame])[0] : null
  const { img, error, loading, subjectImage } = useSubjectImage({
    src: defaultFrameUrl,
    onReady,
    onError
  })

  const viewerSrc = subject?.locations ? Object.values(subject.locations[currentFrame])[0] : ''

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
        img={subjectImage.current}
        maxZoom={5}
        minZoom={0.1}
        naturalHeight={img.naturalHeight}
        naturalWidth={img.naturalWidth}
        setOnDrag={setOnDrag}
        setOnPan={setOnPan}
        setOnZoom={setOnZoom}
        src={img.src}
      >
        <SingleImageViewer
          enableInteractionLayer={false}
          height={img.naturalHeight}
          onKeyDown={handleSpaceBar}
          rotate={rotation}
          width={img.naturalWidth}
        >
          <g ref={subjectImage} role='tabpanel' id='flipbook-tab-panel'>
            <SVGImage
              invert={invert}
              move={move}
              naturalHeight={img.naturalHeight}
              naturalWidth={img.naturalWidth}
              onDrag={onDrag}
              src={viewerSrc}
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
  /** Function passed from Subject Viewer Store */
  enableRotation: PropTypes.func,
  /** Fetched from workflow configuration. Determines whether to autoplay the loop on viewer load */
  flipbookAutoplay: PropTypes.bool,
  /** Passed from Subject Viewer Store */
  invert: PropTypes.bool,
  /** Passed from Subject Viewer Store */
  move: PropTypes.bool,
  /** withKeyZoom in for using keyboard pan and zoom controls while focused on the subject image */
  onKeyDown: PropTypes.func,
  /** Passed from Subject Viewer Store and called when default frame's src is loaded */
  onReady: PropTypes.func,
  /** Fetched from workflow configuration. Number preference for how many loops to play */
  playIterations: PropTypes.number,
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
