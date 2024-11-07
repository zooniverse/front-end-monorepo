import { arrayOf, bool, func, number, shape, string } from 'prop-types'
import { useRef } from 'react'

import SVGContext from '@plugins/drawingTools/shared/SVGContext'

import InteractionLayer from '../InteractionLayer'

import SVGImage from '../SVGComponents/SVGImage'

function calculateAdjustedViewBox({ naturalWidth, naturalHeight, transformMatrix }) {
  const { scaleX, translateX, translateY } = transformMatrix
  const scale = scaleX
  
  // Calculate new dimensions
  const newWidth = naturalWidth / scale
  const newHeight = naturalHeight / scale
  
  // Calculate new origin to keep center point
  const x = (-translateX / scale) 
  const y = (-translateY / scale)
  
  return `${x} ${y} ${newWidth} ${newHeight}`
} 

function calculateScale({ canvas, naturalWidth }) {
  const { width: clientWidth } = canvas?.getBoundingClientRect() || {}
  const calculatedScale = clientWidth / naturalWidth
  return !Number.isNaN(calculatedScale) ? calculatedScale : 1
}

const DEFAULT_HANDLER = () => true

function SingleImageCanvas({
  children,
  enableInteractionLayer = false,
  frame = 0,
  imgRef,
  invert = false,
  move = false,
  naturalHeight,
  naturalWidth,
  onDrag = DEFAULT_HANDLER,
  rotation = 0,
  src,
  subject,
  subjectId,
  transformMatrix // per VisXZoom
}) {
  const canvasLayer = useRef()
  const canvas = canvasLayer.current
  
  const viewBox = `0 0 ${naturalWidth} ${naturalHeight}`
  
  const adjustedViewBox = calculateAdjustedViewBox({ naturalWidth, naturalHeight, transformMatrix })

  const rotationTransform = rotation ? `rotate(${rotation} ${naturalWidth / 2} ${naturalHeight / 2})` : ''

  const scale = calculateScale({ canvas, naturalWidth })

  return (
    <svg
      viewBox={viewBox}
    >
      <SVGContext.Provider
        value={{
          canvas,
          rotate: rotation,
          viewBox: adjustedViewBox,
          width: naturalWidth,
          height: naturalHeight,
        }}
      >
        <g transform={rotationTransform}>
          <svg
            ref={canvasLayer}
            viewBox={adjustedViewBox}
          >
            <SVGImage
              ref={imgRef}
              invert={invert}
              move={move}
              naturalHeight={naturalHeight}
              naturalWidth={naturalWidth}
              onDrag={onDrag}
              src={src}
              subjectID={subjectId}
            />
            {children}
            {enableInteractionLayer && (
              <InteractionLayer
                frame={frame}
                height={naturalHeight}
                move={move}
                onDrag={onDrag}
                scale={scale}
                subject={subject}
                width={naturalWidth}
              />
            )}
          </svg>
        </g>
      </SVGContext.Provider>
    </svg>
  )
}

SingleImageCanvas.propTypes = {
  enableInteractionLayer: bool,
  frame: number,
  imgRef: shape({
    current: shape({
      naturalHeight: number,
      naturalWidth: number,
      src: string
    })
  }),
  invert: bool,
  move: bool,
  naturalHeight: number,
  naturalWidth: number,
  onDrag: func,
  onKeyDown: func,
  rotation: number,
  src: string,
  subject: shape({
    locations: arrayOf(shape({
      url: string
    }))
  }),
  subjectId: string,
  transformMatrix: shape({
    scaleX: number,
    translateX: number,
    translateY: number
  })
}

export default SingleImageCanvas
