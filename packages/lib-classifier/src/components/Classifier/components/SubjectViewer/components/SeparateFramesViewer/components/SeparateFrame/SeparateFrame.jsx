import { Box } from 'grommet'
import PropTypes from 'prop-types'
import { useCallback, useState } from 'react'
import { useStores, useSubjectImageOrVideo } from '@hooks'
import { defaultKeyMappings } from '../../../../../../../../hooks/useKeyZoom'
import SingleImageViewer from '../../../SingleImageViewer/SingleImageViewer'
import {
  AnnotateButton,
  InvertButton,
  MoveButton,
  ResetButton,
  RotateButton,
  ZoomInButton,
  ZoomOutButton
} from '../../../../../ImageToolbar/components'

const DEFAULT_HANDLER = () => true
const DEFAULT_WIDTH = 800
const DEFAULT_HEIGHT = 600

function storeMapper(classifierStore) {
  return {
    hasAnnotateTask: classifierStore.subjectViewer.hasAnnotateTask
  }
}

const SeparateFrame = ({
  enableInteractionLayer = false,
  enableRotation = DEFAULT_HANDLER,
  frame = 0,
  frameUrl = '',
  limitSubjectHeight = false,
  onError = DEFAULT_HANDLER,
  onReady = DEFAULT_HANDLER,
  subject
}) => {
  const mediaType = subject?.locations?.[frame]?.type
  const { media, mediaElementRef, loading, error } = useSubjectImageOrVideo({
    src: frameUrl,
    type: mediaType,
    frame,
    onReady,
    onError,
  })

  const mediaWidth = media?.naturalWidth || media?.videoWidth || DEFAULT_WIDTH
  const mediaHeight = media?.naturalHeight || media?.videoHeight || DEFAULT_HEIGHT

  /** Image Viewer state */
  const [invert, setInvert] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [onPan, setOnPanState] = useState(DEFAULT_HANDLER)
  const [onZoom, setOnZoomState] = useState(DEFAULT_HANDLER)
  const [separateFrameAnnotate, setSeparateFrameAnnotate] = useState(true)
  const [separateFrameMove, setSeparateFrameMove] = useState(false)

  /** Image Viewer actions */
  const handleSetOnPan = useCallback((fn) => {
    setOnPanState(() => fn)
  }, [])

  const handleSetOnZoom = useCallback((fn) => {
    setOnZoomState(() => fn)
  }, [])

  function panLeft() {
    onPan(-1, 0)
  }

  function panRight() {
    onPan(1, 0)
  }

  function panUp() {
    onPan(0, -1)
  }

  function panDown() {
    onPan(0, 1)
  }

  function zoomIn() {
    onZoom('zoomin', 1)
  }

  function zoomOut() {
    onZoom('zoomout', -1)
  }

  const { onKeyZoom } = defaultKeyMappings({
    panLeft,
    panRight,
    panUp,
    panDown,
    rotate: rotation,
    zoomIn,
    zoomOut
  })

  /** Image Toolbar functions */
  const separateFrameEnableAnnotate = () => {
    setSeparateFrameAnnotate(true)
    setSeparateFrameMove(false)
  }

  const separateFrameEnableMove = () => {
    setSeparateFrameMove(true)
    setSeparateFrameAnnotate(false)
  }

  const separateFrameZoomIn = () => {
    onZoom('zoomin', 1)
  }

  const separateFrameZoomOut = () => {
    onZoom('zoomout', -1)
  }
  
  const separateFrameRotate = () => {
    setRotation(prevRotation => prevRotation - 90)
  }

  const separateFrameResetView = () => {
    setRotation(0)
    setInvert(false)
    onZoom('zoomto', 1.0)
  }

  const separateFrameInvert = () => {
    setInvert(prev => !prev)
  }

  /** NOTE: This is to disable the annotate button if there are no annotate tasks */
  const { hasAnnotateTask } = useStores(storeMapper)
  if (!hasAnnotateTask && separateFrameAnnotate) {
    separateFrameEnableMove()
  }

  if (mediaType === 'image') {
    return (
      <Box direction='row'>
        <SingleImageViewer
          enableInteractionLayer={enableInteractionLayer}
          enableRotation={enableRotation}
          frame={frame}
          imgRef={mediaElementRef}
          invert={invert}
          limitSubjectHeight={limitSubjectHeight}
          move={separateFrameMove}
          naturalHeight={mediaHeight}
          naturalWidth={mediaWidth}
          onKeyDown={onKeyZoom}
          rotation={rotation}
          setOnPan={handleSetOnPan}
          setOnZoom={handleSetOnZoom}
          src={frameUrl}
          subject={subject}
        />
        <Box
          background={{
            dark: 'dark-3',
            light: 'white'
          }}
          border={{
            color: {
              dark: 'dark-1',
              light: 'light-3'
            },
            side: 'all'
          }}
          direction='column'
          height='fit-content'
          pad='8px'
          style={{ width: '3rem' }}
        >
          {hasAnnotateTask &&
            <AnnotateButton
              separateFrameAnnotate={separateFrameAnnotate}
              separateFrameEnableAnnotate={separateFrameEnableAnnotate}
            />
          }
          <MoveButton
            separateFrameMove={separateFrameMove}
            separateFrameEnableMove={separateFrameEnableMove}
          />
          <ZoomInButton separateFrameZoomIn={separateFrameZoomIn} />
          <ZoomOutButton separateFrameZoomOut={separateFrameZoomOut} />
          <RotateButton separateFrameRotate={separateFrameRotate} />
          <ResetButton separateFrameResetView={separateFrameResetView} />
          <InvertButton separateFrameInvert={separateFrameInvert} />
        </Box>
      </Box>
    )
  }

  if (mediaType === 'video') {
    return (
      <Box>
        <video
          autoPlay={false}
          controls={true}
          ref={mediaElementRef}
          src={frameUrl}
          width={mediaWidth}
          height={mediaHeight}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </Box>
    )
  }

  return null
}

SeparateFrame.propTypes = {
  /** Determined per mobx store WorkflowStepStore via SubjectViewer. */
  enableInteractionLayer: PropTypes.bool,
  /** Function passed from Subject Viewer Store */
  enableRotation: PropTypes.func,
  /** Index of the Frame */
  frame: PropTypes.number,
  /** String of Object.values(subject.locations[this frame index][0]) */
  frameUrl: PropTypes.string,
  /** Passed from Workflow Store per workflow configuration */
  limitSubjectHeight: PropTypes.bool,
  /** Passed from SubjectViewer and called if the media-fetching hook fails. */
  onError: PropTypes.func,
  /** Passed from SubjectViewer and dimensions are added to classification metadata. Called after svg layers successfully load with `defaultFrameSrc`. */
  onReady: PropTypes.func,
  /** Subject Object */
  subject: PropTypes.shape({
    locations: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string
    }))
  })
}

export default SeparateFrame
