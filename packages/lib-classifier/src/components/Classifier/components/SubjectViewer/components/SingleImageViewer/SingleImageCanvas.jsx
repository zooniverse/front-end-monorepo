import { arrayOf, bool, node, number, shape, string } from 'prop-types'

import { getViewportScale } from '@plugins/drawingTools/shared/SVGContext'
import InteractionLayer from '../InteractionLayer'
import SVGImage from '../SVGComponents/SVGImage'
import SVGCanvas from '../SVGComponents/SVGCanvas'

function SingleImageCanvas({
  enableInteractionLayer = false,
  feedbackMarks = [],
  frame = 0,
  imgRef,
  invert = false,
  move = false,
  naturalHeight,
  naturalWidth,
  rotation = 0,
  src,
  subject,
  svgWidth,
  transform, // per VisXZoom
  transformMatrix,
}) {
  const rotationTransform = rotation ? `rotate(${rotation} ${naturalWidth / 2} ${naturalHeight / 2})` : ''
  const zoomScale = transformMatrix ? transformMatrix.scaleX : 1 
  const viewportScale = getViewportScale(svgWidth, naturalWidth)

  return (
    <svg>
      <g
        data-testid='single-image-canvas-visxzoom-transform-group'
        transform={transform}
      >
        <SVGCanvas
          scale={zoomScale * viewportScale}
          data-testid='single-image-canvas-rotation-transform-group'
          transform={rotationTransform}
        >
          <SVGImage
            ref={imgRef}
            invert={invert}
            naturalHeight={naturalHeight}
            naturalWidth={naturalWidth}
            src={src}
            subjectID={subject?.id}
          />
          {enableInteractionLayer && (
            <InteractionLayer
              frame={frame}
              height={naturalHeight}
              move={move}
              width={naturalWidth}
            />
          )}
          {feedbackMarks}
        </SVGCanvas>
      </g>
    </svg>
  )
}

SingleImageCanvas.propTypes = {
  enableInteractionLayer: bool,
  feedbackMarks: arrayOf(node),
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
  rotation: number,
  src: string,
  subject: shape({
    locations: arrayOf(shape({
      url: string
    }))
  }),
  svgWidth: number,
  transform: string,
  transformMatrix: shape({
    scaleX: number,
    translateX: number,
    translateY: number
  })
}

export default SingleImageCanvas
