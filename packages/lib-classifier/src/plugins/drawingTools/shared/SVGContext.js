import { createContext } from 'react'

export function getViewportScale(svgWidth, viewBoxWidth) {
  // return 1 if either width is undefined / null / zero
  return (svgWidth && viewBoxWidth) ? svgWidth / viewBoxWidth : 1
}

const SVGContext = createContext({
  /**
   * The drawing canvas node from the DOM.
   * @type {SVGGraphicsElement}
   * @default null
   */
  canvas: null,
  /**
   * The overall scale factor for the canvas
   * Useful for emulating `vector-effect:non-scaling-size` by inverting the scale.
   * @type {number}
   * @default 1
   */
  scale: 1
})

export default SVGContext
