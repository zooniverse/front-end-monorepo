import { useEffect, useState } from 'react'
import { Box } from 'grommet'
import PropTypes from 'prop-types'
import { useStores } from '@hooks'

import useSubjectImage from '@hooks/useSubjectImage.js'
import SingleImageViewer from '../../../SingleImageViewer/SingleImageViewer.js'
import SVGImage from '../../../SVGComponents/SVGImage'
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

  const maxZoom = 5
  const minZoom = 0.1

  const defaultViewBox = {
    x: 0,
    y: 0,
    height: naturalHeight,
    width: naturalWidth
  }

  /** State Variables */

  const [invert, setInvert] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [separateFrameAnnotate, setSeparateFrameAnnotate] = useState(true)
  const [separateFrameMove, setSeparateFrameMove] = useState(false)
  const [viewBox, setViewBox] = useState(defaultViewBox)
  const [zoom, setZoom] = useState(1)

  /** Effects */

  useEffect(() => {
    if (frameSrc) {
      enableRotation()
      setViewBox(defaultViewBox)
      setZoom(1)
    }
  }, [frameSrc])

  useEffect(() => {
    const newViewBox = scaledViewBox(zoom)
    setViewBox(newViewBox)
  }, [zoom])

  /** Move/Zoom functions */

  const imageScale = img => {
    const { width: clientWidth } = img ? img.getBoundingClientRect() : {}
    const scale = clientWidth / naturalWidth
    return !Number.isNaN(scale) ? scale : 1
  }
  const scale = imageScale(subjectImage.current) // For images with an InteractionLayer

  const scaledViewBox = scale => {
    const viewBoxScale = 1 / scale
    const xCentre = viewBox.x + viewBox.width / 2
    const yCentre = viewBox.y + viewBox.height / 2
    const width = parseInt(naturalWidth * viewBoxScale, 10)
    const height = parseInt(naturalHeight * viewBoxScale, 10)
    const x = xCentre - width / 2
    const y = yCentre - height / 2
    return { x, y, width, height }
  }

  const onDrag = (event, difference) => {
    setViewBox(prevViewBox => {
      const newViewBox = { ...prevViewBox }
      newViewBox.x -= difference.x
      newViewBox.y -= difference.y
      return newViewBox
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
    setZoom(prevZoom => Math.min(prevZoom + 0.1, maxZoom))
  }

  const separateFrameZoomOut = () => {
    setZoom(prevZoom => Math.max(prevZoom - 0.1, minZoom))
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
    setZoom(1)
    setViewBox({
      x: 0,
      y: 0,
      width: naturalWidth,
      height: naturalHeight
    })
  }

  /** Panning with Keyboard */

  const onPan = (dx, dy) => {
    setViewBox(prevViewBox => {
      const newViewBox = { ...prevViewBox }
      newViewBox.x += dx * 10
      newViewBox.y += dy * 10
      return newViewBox
    })
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

  /** Frame Component */

  const { x, y, width, height } = scaledViewBox(zoom)

  return (
    <Box direction='row'>
      <SingleImageViewer
        enableInteractionLayer={enableInteractionLayer}
        frame={frame}
        height={naturalHeight}
        limitSubjectHeight={limitSubjectHeight}
        onKeyDown={onKeyDown}
        rotate={rotation}
        scale={scale}
        svgMaxHeight={limitSubjectHeight ? `min(${naturalHeight}px, 90vh)` : null}
        viewBox={`${x} ${y} ${width} ${height}`}
        width={naturalWidth}
      >
        <SVGImage
          ref={subjectImage}
          invert={invert}
          move={separateFrameMove}
          naturalHeight={naturalHeight}
          naturalWidth={naturalWidth}
          onDrag={onDrag}
          src={frameSrc}
          subjectID={frameUrl} // for aria-label
        />
      </SingleImageViewer>
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
        { hasAnnotateTask &&
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
