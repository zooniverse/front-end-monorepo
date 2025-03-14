import { Box } from 'grommet'
import { arrayOf, bool, func, number, shape, string } from 'prop-types'
import { useEffect } from 'react'

import ZoomControlButton from '../ZoomControlButton'

import VisXZoom from '../SVGComponents/VisXZoom'

import SingleImageCanvas from './SingleImageCanvas'

const DEFAULT_HANDLER = () => true
const DEFAULT_ZOOM_CONFIG = {
  direction: 'both',
  maxZoom: 10,
  minZoom: 0.1,
  onWheelThrottleWait: 100,
  zoomInValue: 1.2,
  zoomOutValue: 0.8
}

function SingleImageViewer({
  enableInteractionLayer = true,
  enableRotation = DEFAULT_HANDLER,
  frame = 0,
  imgRef,
  invert = false,
  move = false,
  naturalHeight,
  naturalWidth,
  onKeyDown = DEFAULT_HANDLER,
  panning = true,
  rotation = 0,
  setOnPan = DEFAULT_HANDLER,
  setOnZoom = DEFAULT_HANDLER,
  src,
  subject,
  title = undefined,
  zoomControlFn = null,
  zooming = true
}) {
  useEffect(function onMount() {
    enableRotation()
  }, [])

  const singleImageCanvasProps = {
    enableInteractionLayer,
    frame,
    imgRef,
    invert,
    move,
    naturalHeight,
    naturalWidth,
    onKeyDown,
    rotation,
    src,
    subject
  }

  return (
    <>
      {zoomControlFn && (
        <ZoomControlButton
          onClick={zoomControlFn}
          zooming={zooming}
        />
      )}
      <Box
        align='flex-end'
        animation='fadeIn'
        background='light-4'
        overflow='hidden'
        width='100%'
      >
        {title?.id && title?.text && (
          <title id={title.id}>{title.text}</title>
        )}
        <svg
          style={{ touchAction: 'pinch-zoom' }}
          viewBox={`0 0 ${naturalWidth} ${naturalHeight}`}
        >
          <VisXZoom
            height={naturalHeight}
            panning={panning}
            setOnPan={setOnPan}
            setOnZoom={setOnZoom}
            width={naturalWidth}
            zoomConfiguration={DEFAULT_ZOOM_CONFIG}
            zoomingComponent={SingleImageCanvas}
            zooming={zooming}
            {...singleImageCanvasProps}
          />
        </svg>
      </Box>
    </>
  )
}

SingleImageViewer.propTypes = {
  enableInteractionLayer: bool,
  enableRotation: func,
  frame: number,
  imgRef: shape({
    current: shape({
      naturalHeight: number,
      naturalWidth: number,
      src: string
    })
  }),
  invert: bool,
  limitSubjectHeight: bool,
  move: bool,
  naturalHeight: number,
  naturalWidth: number,
  onKeyDown: func,
  panning: bool,
  rotation: number,
  setOnPan: func,
  setOnZoom: func,
  src: string,
  subject: shape({
    locations: arrayOf(shape({
      url: string
    }))
  }),
  title: shape({
    id: string,
    text: string
  }),
  zoomControlFn: func,
  zooming: bool
}

export default SingleImageViewer
