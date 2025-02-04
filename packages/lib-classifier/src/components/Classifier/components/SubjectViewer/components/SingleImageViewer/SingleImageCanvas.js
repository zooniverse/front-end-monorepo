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

function calculateScale({ clientWidth, naturalWidth, transformMatrix }) {
  const { scaleX } = transformMatrix
  const calculatedScale = (clientWidth / naturalWidth) * scaleX
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
  onKeyDown = DEFAULT_HANDLER,
  rotation = 0,
  src,
  subject,
  transformMatrix // per VisXZoom
}) {
  const canvasLayer = useRef()
  const canvas = canvasLayer.current
  
  const adjustedViewBox = calculateAdjustedViewBox({ naturalWidth, naturalHeight, transformMatrix })

  const rotationTransform = rotation ? `rotate(${rotation} ${naturalWidth / 2} ${naturalHeight / 2})` : ''

  const clientWidth = canvas?.getBoundingClientRect().width || 0
  const scale = calculateScale({ clientWidth, naturalWidth, transformMatrix })

  return (
    <SVGContext.Provider
      value={{
        canvas,
        rotate: rotation,
        viewBox: adjustedViewBox,
        width: naturalWidth,
        height: naturalHeight,
      }}
    >
      <svg
        ref={canvasLayer}
        onKeyDown={onKeyDown}
        viewBox={adjustedViewBox}
      >
        <g
          data-testid='single-image-canvas-rotation-group'
          transform={rotationTransform}
        >
          <SVGImage
            ref={imgRef}
            invert={invert}
            move={move}
            naturalHeight={naturalHeight}
            naturalWidth={naturalWidth}
            onDrag={onDrag}
            src={src}
            subjectID={subject?.id}
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
        </g>
      </svg>
    </SVGContext.Provider>
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
  transformMatrix: shape({
    scaleX: number,
    translateX: number,
    translateY: number
  })
}

export default SingleImageCanvas
