import { Box } from 'grommet'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'

import { useKeyZoom, useSubjectImageOrVideo } from '@hooks'

import locationValidator from '../../helpers/locationValidator'

import SingleImageViewer from '../SingleImageViewer/SingleImageViewer'
import FlipbookControls from './components/FlipbookControls'

const DEFAULT_HANDLER = () => true
const DEFAULT_WIDTH = 800
const DEFAULT_HEIGHT = 600

const StyledVideo = styled.video`
  ${props => props.invert && css`filter: invert(1)`}
`

const FlipbookViewer = ({
  defaultFrame = 0,
  enableInteractionLayer = false,
  enableRotation = DEFAULT_HANDLER,
  flipbookAutoplay = false,
  frame = 0,
  invert = false,
  limitSubjectHeight = false,
  move = false,
  onError = DEFAULT_HANDLER,
  onReady = DEFAULT_HANDLER,
  playIterations,
  rotation = 0,
  setFrame = DEFAULT_HANDLER,
  setOnPan = DEFAULT_HANDLER,
  setOnZoom = DEFAULT_HANDLER,
  subject,
  zoomControlFn = undefined,
  zooming = true
}) => {
  // Subject Viewer Store's resetSubject() ensures that the first `frame` fed to
  // the FlipbookViewer will either be 0, or the default_frame as set by
  // subject.metadata. As a result, the defaultFrame prop of FlipbookViewer is
  // now mainly used to determine the dimensions of the "subject frame". (i.e.
  // to keep all images & videos displayed in a consistent width & height)

  const [playing, setPlaying] = useState(false)

  // The "current frame" variable changes between using local state or global
  // state (store) depending on whether the Flipbook is playing through all its
  // items.
  // - we use the global state to correctly sync the current Subject with the
  //   rest of the Classifier, notably the Image Toolbar.
  // - we use local state for performance reasons, to prevent the global store
  //   updating too often.
  // - note that this means when the Flipbook is playing, the rest of Classifier
  //   is "desynced" (notably, the ImageToolbar's won't update, e.g. the Rotate
  //   buttons won't disable when the current frame has a video file.)
  const [localFrame, setLocalFrame] = useState(frame)
  const effectiveFrame = (playing) ? localFrame : frame 
  const effectiveSetFrame = (playing) ? setLocalFrame : setFrame

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
  const defaultMediaType = subject?.locations[defaultFrame]?.type
  const defaultMediaUrl = subject?.locations[defaultFrame]?.url
  const { media, mediaElementRef } = useSubjectImageOrVideo({
    src: defaultMediaUrl,
    type: defaultMediaType,
    frame: defaultFrame,
    onReady,
    onError,
  })

  const viewerWidth = media?.naturalWidth || media?.videoWidth || DEFAULT_WIDTH
  const viewerHeight = media?.naturalHeight || media?.videoHeight || DEFAULT_HEIGHT
  // --------------------------------

  // Now, get the ACTUAL image or video (from the currently-selected frame)
  // that we want to display.
  // Believe it or not, all that hullabaloo above 👆 with the "default media" is
  // only for the sake of determining a consistent viewer width/height for
  // all media files. 
  // --------------------------------
  const currentMediaType = subject?.locations[effectiveFrame]?.type
  const currentMediaUrl = subject?.locations[effectiveFrame]?.url
  // --------------------------------

  const onPlayPause = () => {
    // If we're currently playing and going to pause, tell the global store's current frame to catch up to the local current frame.
    if (playing) { setFrame(localFrame) }
    // If we're currently paused and going to play, tell the local store's current frame to sync with the global state.
    else { setLocalFrame(frame) }

    // Toggle between Play/Pause.
    setPlaying(!playing)
  }

  const { onKeyZoom } = useKeyZoom({ customKeyMappings: { ' ': onPlayPause } })

  return (
    <Box>
      {currentMediaType === 'image' && (
        <SingleImageViewer
          enableInteractionLayer={enableInteractionLayer}
          enableRotation={enableRotation}
          frame={effectiveFrame}
          imgRef={mediaElementRef}
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
          zoomControlFn={zoomControlFn}
          zooming={zooming}
        />
      )}
      {currentMediaType === 'video' && (
        <StyledVideo
          autoPlay={false}
          controls={true}
          invert={invert}
          preload='metadata'
          ref={mediaElementRef}
          src={currentMediaUrl}
          width={viewerWidth}
          height={viewerHeight}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      )}
      <FlipbookControls
        currentFrame={effectiveFrame}
        locations={subject.locations}
        onFrameChange={effectiveSetFrame}
        onPlayPause={onPlayPause}
        playing={playing}
        playIterations={playIterations}
      />
    </Box>
  )
}

FlipbookViewer.propTypes = {
  /** Fetched from metadata.default_frame or initialized to zero. Mainly used to determine size of "subject frame" */
  defaultFrame: PropTypes.number,
  /** Determined per mobx store WorkflowStepStore via SubjectViewer. */
  enableInteractionLayer: PropTypes.bool,
  /** Function passed from Subject Viewer Store */
  enableRotation: PropTypes.func,
  /** Passed from the subject viewer store. Determins the current frame of the Subject */
  frame: PropTypes.number,
  /** Fetched from workflow configuration. Determines whether to autoplay the loop on viewer load */
  flipbookAutoplay: PropTypes.bool,
  /** Passed from Subject Viewer Store */
  invert: PropTypes.bool,
  /** Passed from Workflow Store per workflow configuration */
  limitSubjectHeight: PropTypes.bool,
  /** Passed from Subject Viewer Store */
  move: PropTypes.bool,
  /** Passed from SubjectViewer and called if media-fetching hook fails. */
  onError: PropTypes.func,
  /** Passed from SubjectViewer and dimensions are added to classification metadata. Called after svg layers successfully load with `defaultFrameSrc`. */
  onReady: PropTypes.func,
  /** Fetched from workflow configuration. Number preference for how many loops to play */
  playIterations: PropTypes.number,
  /** Passed from the subject viewer store. Needed in SingleImageViewer to handle transforming (rotating) the image */
  rotation: PropTypes.number,
  /** Usually passed from the Subject Viewer Store. Can be overridden, such as when the FlipbookViewer is used in the DataImageViewer.  */
  setFrame: PropTypes.func,
  /** Passed from the Subject Viewer Store */
  setOnPan: PropTypes.func,
  /** Usually passed from the Subject Viewer Store. Can be overridden, such as when the FlipbookViewer is used in the DataImageViewer. */
  setOnZoom: PropTypes.func,
  /** Required. Passed from SubjectViewer component */
  subject: PropTypes.shape({
    locations: PropTypes.arrayOf(locationValidator)
  }).isRequired,
  /** OPTIONAL: only supply zoomControlFn and zooming if you want to allow users to manually enable/disable zoom & pan functionality. (As of Apr 2026, only used by DataImageViewer.) */
  zoomControlFn: PropTypes.func,
  /** OPTIONAL: see zoomControlFn. */
  zooming: PropTypes.bool,
}

export default FlipbookViewer
