import { useEffect, useState } from 'react'
import { Box, Grid } from 'grommet'
import PropTypes from 'prop-types'

import locationValidator from '../../../../helpers/locationValidator'
import useSubjectImage from '@hooks/useSubjectImage.js'

import SingleImageViewer from '../../../SingleImageViewer/SingleImageViewer.js'
import SVGImage from '../../../SVGComponents/SVGImage'
import SeparateFrameImageToolbar from './components/SeparateFrameImageToolbar'

const DEFAULT_HANDLER = () => true

const FlipbookSeparateFrame = ({
  enableRotation = DEFAULT_HANDLER,
  frameUrl = '',
  limitSubjectHeight = false,
  onError = DEFAULT_HANDLER,
  onKeyDown = DEFAULT_HANDLER,
  onReady = DEFAULT_HANDLER,
  subject
}) => {
  const { img, error, loading, subjectImage } = useSubjectImage({
    src: frameUrl,
    onReady,
    onError
  })

  const { naturalHeight, naturalWidth, src: frameSrc } = img

  const maxZoom = 5
  const minZoom = 0.1

  const defaultViewBox = {
    x: 0,
    y: 0,
    height: naturalHeight,
    width: naturalWidth
  }

  const [canMove, setCanMove] = useState(false)
  const [invert, setInvert] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [viewBox, setViewBox] = useState(defaultViewBox)
  const [zoom, setZoom] = useState(1)

  useEffect(() => {
    if (frameSrc) {
      enableRotation()
      setCanMove(true)
      setViewBox(defaultViewBox)
      setZoom(1)
    }
  }, [frameSrc])

  useEffect(
    function onZoomChange() {
      const newViewBox = scaledViewBox(zoom)
      setViewBox(newViewBox)
    },
    [zoom]
  )

  // For subjects that have an InteractionLayer
  function imageScale(img) {
    const { width: clientWidth } = img ? img.getBoundingClientRect() : {}
    const scale = clientWidth / naturalWidth
    return !Number.isNaN(scale) ? scale : 1
  }

  function scaledViewBox(scale) {
    const viewBoxScale = 1 / scale
    const xCentre = viewBox.x + viewBox.width / 2
    const yCentre = viewBox.y + viewBox.height / 2
    const width = parseInt(naturalWidth * viewBoxScale, 10)
    const height = parseInt(naturalHeight * viewBoxScale, 10)
    const x = xCentre - width / 2
    const y = yCentre - height / 2
    return { x, y, width, height }
  }

  function onDrag(event, difference) {
    setViewBox(prevViewBox => {
      const newViewBox = Object.assign({}, prevViewBox)
      newViewBox.x -= difference.x / 1.5
      newViewBox.y -= difference.y / 1.5
      return newViewBox
    })
  }

  // This is for panning with arrow keys
  function onPan(dx, dy) {
    setViewBox(prevViewBox => {
      const newViewBox = Object.assign({}, prevViewBox)
      newViewBox.x += dx * 10
      newViewBox.y += dy * 10
      return newViewBox
    })
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

  const { x, y, width, height } = scaledViewBox(zoom)
  const scale = imageScale(subjectImage.current)

  return (
    <Box pad={{ bottom: 'small' }}>
      <Grid
        as='section'
        areas={[['subject', 'toolbar']]}
        columns={['auto', '3rem']}
        gridArea='viewer'
        height='fit-content'
        rows={['auto']}
      >
        <div style={{ width: '100%' }}>
          <SingleImageViewer
            enableInteractionLayer={false}
            height={naturalHeight}
            limitSubjectHeight={limitSubjectHeight}
            onKeyDown={onKeyDown}
            rotate={rotation}
            scale={scale}
            svgMaxHeight={
              limitSubjectHeight ? `min(${naturalHeight}px, 90vh)` : null
            }
            viewBox={`${x} ${y} ${width} ${height}`}
            width={naturalWidth}
          >
            <g ref={subjectImage}>
              <SVGImage
                invert={invert}
                move={canMove}
                naturalHeight={naturalHeight}
                naturalWidth={naturalWidth}
                onDrag={onDrag}
                src={frameSrc}
                subjectID={subject.id}
              />
            </g>
          </SingleImageViewer>
        </div>
        <SeparateFrameImageToolbar
          gridArea='toolbar'
          separateFrameInvert={separateFrameInvert}
          separateFrameResetView={separateFrameResetView}
          separateFrameRotate={separateFrameRotate}
          separateFrameZoomIn={separateFrameZoomIn}
          separateFrameZoomOut={separateFrameZoomOut}
        />
      </Grid>
    </Box>
  )
}

FlipbookSeparateFrame.propTypes = {
  /** Function passed from Subject Viewer Store */
  enableRotation: PropTypes.func,
  /** String of Object.values(subject.locations[this frame index][0]) */
  frameUrl: PropTypes.string,
  /** withKeyZoom in for using keyboard pan and zoom controls while focused on the subject image */
  onKeyDown: PropTypes.func,
  /** Passed from Subject Viewer Store and called when default frame's src is loaded */
  onReady: PropTypes.func,
  /** Required. Passed from SubjectViewer component */
  subject: PropTypes.shape({
    locations: PropTypes.arrayOf(locationValidator)
  }).isRequired
}

export default FlipbookSeparateFrame
