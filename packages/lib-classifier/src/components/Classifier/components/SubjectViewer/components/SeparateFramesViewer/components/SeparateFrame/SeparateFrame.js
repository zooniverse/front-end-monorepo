import { Box } from 'grommet'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

import { useStores, useSubjectImage } from '@hooks'

import SingleImageCanvas from '../../../SingleImageViewer/SingleImageCanvas'
import PlaceholderSVG from '../../../SingleImageViewer/components/PlaceholderSVG'
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
  const { img, error, loading, subjectImage } = useSubjectImage({
    frame,
    src: frameUrl,
    onReady,
    onError
  })

  const { naturalHeight = 600, naturalWidth = 800, src: frameSrc } = img

  const maxZoom = 5
  const minZoom = 0.1

  const initialTransformMatrix = {
    scaleX: 1,
    scaleY: 1,
    translateX: 0,
    translateY: 0,
    skewX: 0,
    skewY: 0
  }

  /** State Variables */

  const [invert, setInvert] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [separateFrameAnnotate, setSeparateFrameAnnotate] = useState(true)
  const [separateFrameMove, setSeparateFrameMove] = useState(false)
  const [transformMatrix, setTransformMatrix] = useState(initialTransformMatrix)

  /** Effects */

  useEffect(() => {
    if (frameSrc) {
      enableRotation()
      setTransformMatrix(initialTransformMatrix)
    }
  }, [frameSrc])

  /** Move/Zoom functions */

  const onDrag = (event, difference) => {
    setTransformMatrix(prevMatrix => {
      // Adjust the drag distance by the current scale
      const adjustedX = difference.x / prevMatrix.scaleX
      const adjustedY = difference.y / prevMatrix.scaleY
      
      return {
        ...prevMatrix,
        translateX: prevMatrix.translateX + adjustedX,
        translateY: prevMatrix.translateY + adjustedY
      }
    })
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

  /** NOTE: This is to disable the annotate button if there are no annotate tasks */
  const { hasAnnotateTask } = useStores(storeMapper)
  if (!hasAnnotateTask && separateFrameAnnotate) {
    separateFrameEnableMove();
  }

  const separateFrameZoomIn = () => {
    setTransformMatrix(prevMatrix => {
      const newScale = Math.min(prevMatrix.scaleX + 0.1, maxZoom)
      return {
        ...prevMatrix,
        scaleX: newScale,
        scaleY: newScale
      }
    })
  }

  const separateFrameZoomOut = () => {
    setTransformMatrix(prevMatrix => {
      const newScale = Math.max(prevMatrix.scaleX - 0.1, minZoom)
      return {
        ...prevMatrix,
        scaleX: newScale,
        scaleY: newScale
      }
    })
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
    setTransformMatrix(initialTransformMatrix)
  }

  /** Panning with Keyboard */

  const onPan = (dx, dy) => {
    setTransformMatrix(prevMatrix => ({
      ...prevMatrix,
      translateX: prevMatrix.translateX + dx * 10,
      translateY: prevMatrix.translateY + dy * 10
    }))
  }

  const onKeyDown = e => {
    const ALLOWED_TAGS = ['svg', 'button', 'g', 'rect']
    const htmlTag = e.target?.tagName.toLowerCase()

    if (ALLOWED_TAGS.includes(htmlTag)) {
      switch (e.key) {
        case '+':
        case '=': {
          separateFrameZoomIn()
          return true
        }
        case '-':
        case '_': {
          separateFrameZoomOut()
          return true
        }
        case 'ArrowRight': {
          e.preventDefault()
          onPan(1, 0)
          return false
        }
        case 'ArrowLeft': {
          e.preventDefault()
          onPan(-1, 0)
          return false
        }
        case 'ArrowUp': {
          e.preventDefault()
          onPan(0, -1)
          return false
        }
        case 'ArrowDown': {
          e.preventDefault()
          onPan(0, 1)
          return false
        }
        default: {
          return true
        }
      }
    }
  }

  /** Loading */
  
  if (loading) {
    return (
      <PlaceholderSVG
        maxHeight={limitSubjectHeight ? `min(${naturalHeight}px, 90vh)` : null}
        maxWidth={limitSubjectHeight ? `${naturalWidth}px` : '100%'}
        viewBox={`0 0 ${naturalWidth} ${naturalHeight}`}
      />
    )
  }

  /** Error */

  if (error) {
    return <div>Something went wrong.</div>
  }

  /** Frame Component */

  return (
    <Box direction='row'>
      <SingleImageCanvas
        enableInteractionLayer={enableInteractionLayer}
        frame={frame}
        imgRef={subjectImage}
        invert={invert}
        move={separateFrameMove}
        naturalHeight={naturalHeight}
        naturalWidth={naturalWidth}
        onDrag={onDrag}
        onKeyDown={onKeyDown}
        rotation={rotation}
        src={frameSrc}
        subject={subject}
        subjectId={`${subjectId}-${frame}`}
        transformMatrix={transformMatrix}
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
        onKeyDown={onKeyDown}
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
  /** Function passed from Workflow Configuration */
  limitSubjectHeight: PropTypes.bool,
  /** Passed from Subject Viewer Store and called whe a frame's src is not loaded */
  onError: PropTypes.func,
  /** Passed from Subject Viewer Store and called when a frame's src is loaded */
  onReady: PropTypes.func
}

export default SeparateFrame
