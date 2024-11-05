import { arrayOf, bool, func, number, shape, string } from 'prop-types'
import { useRef } from 'react'

import SVGContext from '@plugins/drawingTools/shared/SVGContext'

import InteractionLayer from '../InteractionLayer'

import SVGImage from '../SVGComponents/SVGImage'

function SingleImageCanvas({
  children,
  enableInteractionLayer,
  frame,
  imgRef,
  invert,
  move,
  naturalHeight,
  naturalWidth,
  onDrag,
  onKeyDown,
  rotation,
  src,
  subject,
  subjectId,
  transform, // per VisXZoom
}) {
  const canvasLayer = useRef()
  const canvas = canvasLayer.current

  const viewBox = `0 0 ${naturalWidth} ${naturalHeight}`
  
  const rotationTransform = `rotate(${rotation} ${naturalWidth / 2} ${naturalHeight / 2})`

  let combinedTransform = rotationTransform
  if (transform) {
    combinedTransform += ` ${transform}`
  }

  const { width: clientWidth, height: clientHeight } = canvas?.getBoundingClientRect() || {}
  const calculatedScale = clientWidth / naturalWidth
  const scale = !Number.isNaN(calculatedScale) ? calculatedScale : 1

  return (
    <SVGContext.Provider
      value={{
        canvas,
        rotate: rotation,
        viewBox,
        width: naturalWidth,
        height: naturalHeight,
      }}
    >
      <svg
        onKeyDown={onKeyDown}
        ref={canvasLayer}
        viewBox={viewBox}
      >
        <g transform={combinedTransform}>
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
              onDrag={onDrag}
              scale={scale}
              subject={subject}
              width={naturalWidth}
              viewBox={viewBox}
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
  subjectId: string,
  transform: string,
  viewBox: string,
}

export default SingleImageCanvas
