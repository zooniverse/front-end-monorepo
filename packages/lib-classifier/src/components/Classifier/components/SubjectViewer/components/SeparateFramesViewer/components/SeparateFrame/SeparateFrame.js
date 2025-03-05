import { Box } from 'grommet'
import PropTypes from 'prop-types'
import { useCallback, useState } from 'react'
import { useStores, useSubjectImage } from '@hooks'
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
  const [invert, setInvert] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [onPan, setOnPanState] = useState(DEFAULT_HANDLER)
  const [onZoom, setOnZoomState] = useState(DEFAULT_HANDLER)
  const [separateFrameAnnotate, setSeparateFrameAnnotate] = useState(true)
  const [separateFrameMove, setSeparateFrameMove] = useState(false)

  const { img, error, loading, subjectImage } = useSubjectImage({
    frame,
    src: frameUrl,
    onError,
    onReady
  })
  const {
    naturalHeight = 600,
    naturalWidth = 800
  } = img

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

  const { hasAnnotateTask } = useStores(storeMapper)
  if (!hasAnnotateTask && separateFrameAnnotate) {
    separateFrameEnableMove()
  }

  const separateFrameRotate = () => {
    setRotation(prevRotation => prevRotation - 90)
  }

  const separateFrameInvert = () => {
    setInvert(prev => !prev)
  }

  const separateFrameZoomIn = () => {
    onZoom('zoomin', 1)
  }

  const separateFrameZoomOut = () => {
    onZoom('zoomout', -1)
  }

  const separateFrameResetView = () => {
    setRotation(0)
    setInvert(false)
    onZoom('zoomto', 1.0)
  }

  return (
    <Box direction='row'>
      <SingleImageViewer
        enableInteractionLayer={enableInteractionLayer}
        enableRotation={enableRotation}
        frame={frame}
        imgRef={subjectImage}
        invert={invert}
        limitSubjectHeight={limitSubjectHeight}
        move={separateFrameMove}
        naturalHeight={naturalHeight}
        naturalWidth={naturalWidth}
        onKeyDown={onKeyZoom}
        rotation={rotation}
        setOnPan={handleSetOnPan}
        setOnZoom={handleSetOnZoom}
        src={img.src}
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

SeparateFrame.propTypes = {
  /** Passed from Subject Viewer Store */
  enableInteractionLayer: PropTypes.bool,
  /** Function passed from Subject Viewer Store */
  enableRotation: PropTypes.func,
  /** Index of the Frame */
  frame: PropTypes.number,
  /** String of Object.values(subject.locations[this frame index][0]) */
  frameUrl: PropTypes.string,
  /** Function passed from Workflow Configuration via Subject Viewer Store */
  limitSubjectHeight: PropTypes.bool,
  /** Passed from Subject Viewer Store and called whe a frame's src is not loaded */
  onError: PropTypes.func,
  /** Passed from Subject Viewer Store and called when a frame's src is loaded */
  onReady: PropTypes.func,
  /** Subject Object */
  subject: PropTypes.shape({
    locations: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string
    }))
  })
}

export default SeparateFrame
