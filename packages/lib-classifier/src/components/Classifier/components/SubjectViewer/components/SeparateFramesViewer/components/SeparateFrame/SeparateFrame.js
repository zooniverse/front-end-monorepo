import { Box } from 'grommet'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

import { useStores, useSubjectImage } from '@hooks'

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
  return { hasAnnotateTask: classifierStore.subjectViewer.hasAnnotateTask }
}

const SeparateFrame = ({
  enableInteractionLayer = false,
  enableRotation = DEFAULT_HANDLER,
  frame = 0,
  frameUrl = '',
  limitSubjectHeight = false,
  onError = DEFAULT_HANDLER,
  onReady = DEFAULT_HANDLER
}) => {
  const { img, error, loading, subjectImage } = useSubjectImage({
    src: frameUrl,
    onReady,
    onError
  })

  const { naturalHeight = 600, naturalWidth = 800, src: frameSrc } = img

  /** State Variables */

  const [invert, setInvert] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [separateFrameAnnotate, setSeparateFrameAnnotate] = useState(true)
  const [separateFrameMove, setSeparateFrameMove] = useState(false)

  /** Effects */

  useEffect(() => {
    if (frameSrc) {
      enableRotation()
    }
  }, [frameSrc])

  /** Image Toolbar functions */
  const separateFrameEnableAnnotate = () => {
    setSeparateFrameAnnotate(true)
    setSeparateFrameMove(false)
  }

  const separateFrameEnableMove = () => {
    setSeparateFrameMove(true)
    setSeparateFrameAnnotate(false)
  }

  /** NOTE: This is to disable the annotate button if there are no annotate tasks */
  const { hasAnnotateTask } = useStores(storeMapper)
  if (!hasAnnotateTask && separateFrameAnnotate) {
    separateFrameEnableMove();
  }

  const separateFrameRotate = () => {
    const newRotation = rotation - 90
    setRotation(newRotation)
  }

  const separateFrameInvert = () => {
    setInvert(!invert)
  }

  const separateFrameResetView = () => {
    setRotation(0)
    setInvert(false)
  }

  /** Frame Component */

  return (
    <Box direction='row'>
      <SingleImageViewer
        enableInteractionLayer={enableInteractionLayer}
        frame={frame}
        imgRef={subjectImage}
        invert={invert}
        move={separateFrameMove}
        naturalHeight={naturalHeight}
        naturalWidth={naturalWidth}
        rotation={rotation}
        src={frameSrc}
        subject={img}
        subjectId={img?.id}
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
        <ZoomInButton />
        <ZoomOutButton />
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
  /** Function passed from Workflow Configuration */
  limitSubjectHeight: PropTypes.bool,
  /** Passed from Subject Viewer Store and called whe a frame's src is not loaded */
  onError: PropTypes.func,
  /** Passed from Subject Viewer Store and called when a frame's src is loaded */
  onReady: PropTypes.func
}

export default SeparateFrame
