import { Box } from 'grommet'
import { arrayOf, bool, func, number, shape, string } from 'prop-types'
import { useRef } from 'react'

import SVGContext from '@plugins/drawingTools/shared/SVGContext'

import InteractionLayer from '../InteractionLayer'
import ZoomControlButton from '../ZoomControlButton'

import SVGImage from '../SVGComponents/SVGImage'
import VisXZoom from '../SVGComponents/VisXZoom'

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

function SVGImageCanvas({
  initialTransformMatrix: initialPanZoomTransformMatrix,
  transformMatrix: panZoomTransformMatrix,
  transform: panZoomTransform,
  children,
  enableInteractionLayer,
  frame,
  height,
  imgRef,
  invert,
  move,
  onDrag,
  src,
  subject,
  subjectId,
  rotation,
  viewBox,
  width,
}) {
  const canvasLayer = useRef()
  const canvas = canvasLayer.current

  return (
    <SVGContext.Provider
      value={{
        canvas,
        rotate: rotation,
        viewBox,
        width,
        height
      }}
    >
      <svg
        ref={canvasLayer}
        viewBox={viewBox}
        style={{ overflow: 'visible' }}
      >
        <g transform={panZoomTransform}>
          <SVGImage
            ref={imgRef}
            invert={invert}
            move={move}
            naturalHeight={height}
            naturalWidth={width}
            onDrag={onDrag}
            src={src}
            subjectID={subjectId}
          />
          {children}
          {enableInteractionLayer && (
            <InteractionLayer
              frame={frame}
              height={height}
              onDrag={onDrag}
              subject={subject}
              width={width}
              viewBox={viewBox}
            />
          )}
        </g>
      </svg>
    </SVGContext.Provider>
  )
}

function SingleImageViewer({
  enableInteractionLayer = true,
  frame = 0,
  imgRef,
  invert = false,
  move = false,
  naturalHeight,
  naturalWidth,
  onDrag = DEFAULT_HANDLER,
  panning = true,
  rotation = 0,
  setOnDrag = DEFAULT_HANDLER,
  setOnZoom = DEFAULT_HANDLER,
  setOnPan = DEFAULT_HANDLER,
  src,
  subject,
  subjectId,
  title = DEFAULT_TITLE,
  zoomControlFn,
  zooming = true
}) {
  const rotationTransform = `rotate(${rotation} ${naturalWidth / 2} ${naturalHeight / 2})`
  const viewBox = `0 0 ${naturalWidth} ${naturalHeight}`

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
        <svg viewBox={viewBox}>
          <g transform={rotationTransform}>
            <VisXZoom
              enableInteractionLayer={enableInteractionLayer}
              frame={frame}
              height={naturalHeight}
              imgRef={imgRef}
              invert={invert}
              move={move}
              onDrag={onDrag}
              panning={panning}
              rotation={rotation}
              setOnDrag={setOnDrag}
              setOnPan={setOnPan}
              setOnZoom={setOnZoom}
              src={src}
              subject={subject}
              subjectId={subjectId}
              width={naturalWidth}
              zoomConfiguration={DEFAULT_ZOOM_CONFIG}
              zoomingComponent={SVGImageCanvas}
              zooming={zooming}
              viewBox={viewBox}
            />
          </g>
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
  onDrag: func,
  panning: bool,
  rotation: number,
  scale: number,
  setOnDrag: func,
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
