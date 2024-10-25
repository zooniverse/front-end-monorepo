import { ParentSize } from '@visx/responsive'
import { Box } from 'grommet'
import { arrayOf, bool, func, number, shape, string } from 'prop-types'
import { useEffect, useRef, useState } from 'react'

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

function SingleImageViewer({
  enableInteractionLayer = true,
  frame = 0,
  imgRef,
  invert = false,
  move = false,
  naturalHeight,
  naturalWidth,
  panning = true,
  rotation = 0,
  scale = 1,
  setOnZoom = DEFAULT_HANDLER,
  setOnPan = DEFAULT_HANDLER,
  src,
  subject,
  subjectId,
  title = DEFAULT_TITLE,
  zoomControlFn,
  zooming = true
}) {
  const canvasLayer = useRef()
  const canvas = canvasLayer.current
  const rotationTransform = `rotate(${rotation} ${naturalWidth / 2} ${naturalHeight / 2})`
  const viewBox = `0 0 ${naturalWidth} ${naturalHeight}`

  function SVGImageComponent({
    children,
    initialTransformMatrix: initialPanZoomTransformMatrix,
    transformMatrix: panZoomTransformMatrix,
    transform: panZoomTransform
  }) {
    return (
      <svg viewBox={viewBox}>
        <g transform={panZoomTransform}>
          <SVGImage
            ref={imgRef}
            invert={invert}
            move={move}
            naturalHeight={naturalHeight}
            naturalWidth={naturalWidth}
            src={src}
            subjectID={subjectId}
          />
          {children}
          {enableInteractionLayer && (
            <InteractionLayer
              frame={frame}
              height={naturalHeight}
              scale={scale}
              subject={subject}
              width={naturalWidth}
            />
          )}
        </g>
      </svg>
    )
  }

  return (
    <ParentSize>
      {(parent) => (
        <SVGContext.Provider
          value={{
            canvas,
            rotate: rotation,
            viewBox,
            width: parent.width,
            height: parent.height
          }}
        >
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
                  height={naturalHeight}
                  panning={panning}
                  setOnPan={setOnPan}
                  setOnZoom={setOnZoom}
                  width={naturalWidth}
                  zoomConfiguration={DEFAULT_ZOOM_CONFIG}
                  zoomingComponent={SVGImageComponent}
                  zooming={zooming}
                />
              </g>
            </svg>
          </Box>
        </SVGContext.Provider>
      )}
    </ParentSize>
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
  panning: bool,
  rotation: number,
  scale: number,
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
