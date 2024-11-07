import { Box } from 'grommet'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { useStores } from '@hooks'
import SingleImageViewerContainer from '../../../SingleImageViewer/SingleImageViewerContainer'
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
  return { hasAnnotateTask: classifierStore.subjectViewer.hasAnnotateTask }
}

const SeparateFrame = ({
  enableInteractionLayer = false,
  enableRotation = DEFAULT_HANDLER,
  frame = 0,
  frameUrl = '',
  limitSubjectHeight = false,
  onError = DEFAULT_HANDLER,
  onReady = DEFAULT_HANDLER,
  subject,
  subjectId
}) => {
  const [invert, setInvert] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [separateFrameAnnotate, setSeparateFrameAnnotate] = useState(true)
  const [separateFrameMove, setSeparateFrameMove] = useState(false)

  let onZoom

  function setOnZoom(fn) {
    onZoom = fn
  }

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
      <SingleImageViewerContainer
        enableInteractionLayer={enableInteractionLayer}
        enableRotation={enableRotation}
        frame={frame}
        invert={invert}
        limitSubjectHeight={limitSubjectHeight}
        move={separateFrameMove}
        onError={onError}
        onReady={onReady}
        rotation={rotation}
        setOnZoom={setOnZoom}
        subject={subject}
        subjectId={`${subjectId}-${frame}`}
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
  enableInteractionLayer: PropTypes.bool,
  enableRotation: PropTypes.func,
  frame: PropTypes.number,
  frameUrl: PropTypes.string,
  limitSubjectHeight: PropTypes.bool,
  onError: PropTypes.func,
  onReady: PropTypes.func,
  subject: PropTypes.shape({
    locations: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string
    }))
  }),
  subjectId: PropTypes.string
}

export default SeparateFrame
