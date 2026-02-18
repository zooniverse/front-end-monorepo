import { arrayOf, bool, number, shape, string } from 'prop-types'
import { useEffect, useRef, useState } from 'react'

import SVGContext from '@plugins/drawingTools/shared/SVGContext'

import InteractionLayer from '../InteractionLayer'

import SVGImage from '../SVGComponents/SVGImage'


function SingleImageCanvas({
  enableInteractionLayer = false,
  frame = 0,
  imgRef,
  invert = false,
  move = false,
  naturalHeight,
  naturalWidth,
  rotation = 0,
  src,
  subject,
  transform, // per VisXZoom
  transformMatrix,
}) {
  const canvasLayer = useRef()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const rotationTransform = rotation ? `rotate(${rotation} ${naturalWidth / 2} ${naturalHeight / 2})` : ''

  return (
      <SVGContext.Provider
        value={{
          canvas: canvasLayer.current,
          rotate: rotation,
          transformMatrix
        }}
      >
        <svg>
          <g
            data-testid='single-image-canvas-visxzoom-transform-group'
            transform={transform}
          >
            <g
              ref={canvasLayer}
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
              {isMounted && enableInteractionLayer && (
                <InteractionLayer
                  frame={frame}
                  height={naturalHeight}
                  move={move}
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
