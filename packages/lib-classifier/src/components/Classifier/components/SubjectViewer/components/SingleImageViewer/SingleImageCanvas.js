import { arrayOf, bool, func, number, shape, string } from 'prop-types'
import { useRef } from 'react'

import SVGContext from '@plugins/drawingTools/shared/SVGContext'

import InteractionLayer from '../InteractionLayer'

import SVGImage from '../SVGComponents/SVGImage'

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
  onKeyDown = DEFAULT_HANDLER,
  rotation = 0,
  src,
  subject,
  transform, // per VisXZoom
  transformMatrix // per VisXZoom
}) {
  const canvasLayer = useRef()
  const canvas = canvasLayer.current

  const rotationTransform = rotation ? `rotate(${rotation} ${naturalWidth / 2} ${naturalHeight / 2})` : ''
  
  const clientWidth = canvas?.getBoundingClientRect().width || 0
  const scale = clientWidth / naturalWidth

  return (
    <SVGContext.Provider value={{ canvas }}>
      <svg
        ref={canvasLayer}
        onKeyDown={onKeyDown}
      >
        <g
          transform={transform}
        >
          <g
            data-testid='single-image-canvas-rotation-group'
            transform={rotationTransform}
          >
            <SVGImage
              ref={imgRef}
              invert={invert}
              move={false} // dragging is handled by VisXZoom in SingleImageViewer
              naturalHeight={naturalHeight}
              naturalWidth={naturalWidth}
              src={src}
              subjectID={subject?.id}
            />
            {children}
            {enableInteractionLayer && (
              <InteractionLayer
                frame={frame}
                height={naturalHeight}
                move={move}
                scale={scale}
                subject={subject}
                width={naturalWidth}
              />
            )}
          </g>
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
  onKeyDown: func,
  rotation: number,
  src: string,
  subject: shape({
    locations: arrayOf(shape({
      url: string
    }))
  }),
  transform: string,
  transformMatrix: shape({
    scaleX: number,
    translateX: number,
    translateY: number
  })
}

export default SingleImageCanvas
