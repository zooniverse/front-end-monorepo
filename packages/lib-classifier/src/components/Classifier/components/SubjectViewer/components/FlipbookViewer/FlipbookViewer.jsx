import { Box } from 'grommet'
import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'

import { useKeyZoom, useSubjectImageOrVideo } from '@hooks'

import locationValidator from '../../helpers/locationValidator'

import SingleImageViewer from '../SingleImageViewer/SingleImageViewer'
import FlipbookControls from './components/FlipbookControls'

const DEFAULT_HANDLER = () => true
const DEFAULT_WIDTH = 1000
const DEFAULT_HEIGHT = 100

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

  const [viewerWidth, setViewerWidth] = useState(DEFAULT_WIDTH)
  const [viewerHeight, setViewerHeight] = useState(DEFAULT_HEIGHT)
  
  const imageElementRef = useRef()
  const videoElementRef = useRef()
  
  useEffect(() => {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!reducedMotionQuery.matches && flipbookAutoplay) {
      setPlaying(true)
    }
  }, [])

  // Determine the size of the "subject frame".
  // This is determined by the size of the first image or video file in the
  // Subject, so e.g. if the first image is 800x200, then all other images will
  // fit into a 800x200 frame.
  // --------------------------------
  
  function onImageLoad (event) {
    const { naturalHeight, naturalWidth } = event.target
    setViewerWidth(naturalWidth)
    setViewerHeight(naturalHeight)
    
    const mediaElement = imageElementRef.current
    const { width: clientWidth, height: clientHeight } = mediaElement
      ? mediaElement.getBoundingClientRect()
      : {}
    const target = { clientHeight, clientWidth, naturalHeight, naturalWidth }
    onReady({ target }, defaultFrame)  // onImageLoad triggers when defaultFrame loads, not currentFrame.
  }

  function onVideoLoad (event) {
    const { videoHeight, videoWidth } = event.target
    setViewerWidth(videoWidth)
    setViewerHeight(videoHeight)

    const mediaElement = videoElementRef.current
    const { width: clientWidth, height: clientHeight } = mediaElement
      ? mediaElement.getBoundingClientRect()
      : {}
    const target = { clientHeight, clientWidth, naturalHeight: videoHeight, naturalWidth: videoWidth }
    onReady({ target }, defaultFrame)  // onImageLoad triggers when defaultFrame loads, not currentFrame.
  }

  // When Subject changes, fetch details of the first/default image/video, to
  // determine the viewer width & height.
  useEffect(function onSubjectChange () {
    setViewerWidth(DEFAULT_WIDTH)
    setViewerHeight(DEFAULT_HEIGHT)

    const defaultMediaType = subject?.locations[defaultFrame]?.type
    const defaultMediaUrl = subject?.locations[defaultFrame]?.url

    if (defaultMediaType === 'image') {
      // Use standard Image object to pre-load image files.
      const { Image } = window
      const img = new Image()      
      img.onload = onImageLoad
      img.onerror = onMediaError
      img.src = defaultMediaUrl

    } else if (defaultMediaType === 'video') {
      // Use <video> element to pre-load video files.
      const video = document.createElement('video')
      video.onloadedmetadata = onVideoLoad
      video.onerror = onMediaError
      video.src = defaultMediaUrl

      // NOTE: alternatively, we could just add onLoadedMetadata to the <video>
      // element in the Subject Viewer. 
    }

  }, [subject])

  function onMediaError (error) {
    console.error(error)
    onError(error)
  }

  // --------------------------------

  // Now, get the ACTUAL image or video (from the currently-selected frame)
  // that we want to display.
  // Believe it or not, all that hullabaloo above 👆 with the "default media" is
  // only for the sake of determining a consistent viewer width/height for
  // all media files. 
  // --------------------------------
  const currentMediaType = subject?.locations[currentFrame]?.type
  const currentMediaUrl = subject?.locations[currentFrame]?.url
  // --------------------------------

  const onPlayPause = () => {
    setPlaying(!playing)
  }

  const { onKeyZoom } = useKeyZoom({ customKeyMappings: { ' ': onPlayPause } })

  return (
    <Box>
      {currentMediaType === 'image' && (
        <SingleImageViewer
          enableInteractionLayer={enableInteractionLayer}
          enableRotation={enableRotation}
          frame={currentFrame}
          imgRef={imageElementRef}
          invert={invert}
          limitSubjectHeight={limitSubjectHeight}
          move={move}
          naturalHeight={viewerHeight}
          naturalWidth={viewerWidth}
          onKeyDown={onKeyZoom}
          rotation={rotation}
          setOnPan={setOnPan}
          setOnZoom={setOnZoom}
          src={currentMediaUrl}
          subject={subject}
        />
      )}
      {currentMediaType === 'video' && (
        <video
          autoPlay={false}
          controls={true}
          ref={videoElementRef}
          src={currentMediaUrl}
          width={viewerWidth}
          height={viewerHeight}
          onError={onMediaError}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      )}
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
  /** Determined per mobx store WorkflowStepStore via SubjectViewer. */
  enableInteractionLayer: PropTypes.bool,
  /** Function passed from Subject Viewer Store */
  enableRotation: PropTypes.func,
  /** Fetched from workflow configuration. Determines whether to autoplay the loop on viewer load */
  flipbookAutoplay: PropTypes.bool,
  /** Passed from Subject Viewer Store */
  invert: PropTypes.bool,
  /** Passed from Workflow Store per workflow configuration */
  limitSubjectHeight: PropTypes.bool,
  /** Passed from Subject Viewer Store */
  move: PropTypes.bool,
  /** Passed from SubjectViewer and called if `useSubjectImage()` hook fails. */
  onError: PropTypes.func,
  /** Passed from SubjectViewer and dimensions are added to classification metadata. Called after svg layers successfully load with `defaultFrameSrc`. */
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
