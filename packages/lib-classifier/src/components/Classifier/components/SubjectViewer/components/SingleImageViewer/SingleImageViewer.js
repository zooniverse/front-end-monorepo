import { Box } from 'grommet'
import { arrayOf, bool, func, number, shape, string } from 'prop-types'

import ZoomControlButton from '../ZoomControlButton'

import VisXZoom from '../SVGComponents/VisXZoom'

import SingleImageCanvas from './SingleImageCanvas'

const DEFAULT_HANDLER = () => true
const DEFAULT_TITLE = {
  id: 'unknown',
  text: 'unknown'
}
const DEFAULT_ZOOM_CONFIG = {
  direction: 'both',
  maxZoom: 10,
  minZoom: 0.1,
  zoomInValue: 1.2,
  zoomOutValue: 0.8
}

function SingleImageViewer({
  enableInteractionLayer = true,
  frame = 0,
  imgRef,
  invert = false,
  move = false,
  naturalHeight,
  naturalWidth,
  onKeyDown = DEFAULT_HANDLER,
  panning = true,
  rotation = 0,
  setOnZoom = DEFAULT_HANDLER,
  setOnPan = DEFAULT_HANDLER,
  src,
  subject,
  subjectId,
  title = DEFAULT_TITLE,
  zoomControlFn = null,
  zooming = true
}) {
  const SingleImageCanvasProps = {
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
    subject,
    subjectId
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
        overflow='hidden'
        width='100%'
      >
        {title?.id && title?.text && (
          <title id={title.id}>{title.text}</title>
        )}
          <VisXZoom
            height={naturalHeight}
            panning={panning}
            setOnPan={setOnPan}
            setOnZoom={setOnZoom}
            width={naturalWidth}
            zoomConfiguration={DEFAULT_ZOOM_CONFIG}
            zoomingComponent={SingleImageCanvas}
            zooming={zooming}
            {...SingleImageCanvasProps}
          />
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
  setOnZoom: func,
  setOnPan: func,
  src: string,
  subject: shape({
    locations: arrayOf(shape({
      url: string
    }))
  }),
  subjectId: string,
  title: shape({
    id: string,
    text: string
  }),
  zoomControlFn: func,
  zooming: bool
}

export default SingleImageViewer
