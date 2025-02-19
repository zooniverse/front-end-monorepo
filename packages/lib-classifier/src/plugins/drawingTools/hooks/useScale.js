import { useContext, useState } from 'react'

import SVGContext from '../shared/SVGContext'

/**
 * Get the scale (screen width / intrinsic width) of the zoomed and rotated drawing canvas.
 * @param {Object} svgContext - The drawing canvas context.
 * @param {SVGGraphicsElement} svgContext.canvas - The drawing canvas node from the DOM.
 * @param { number } svgContext.rotate - The rotation angle of the drawing canvas.
 * @returns {number} The scale of the drawing canvas.
 * @default 1
 */
function getScale(svgContext) {
  const { canvas, rotate = 0 } = svgContext
  // JSDOM doesn't support SVG, so we need to check for `getBBox` to run the tests.
  if (canvas?.getBBox) {
    // zoomed and rotated height and width relative to the viewport.
    const { width: clientWidth, height: clientHeight } = canvas.getBoundingClientRect()
    // intrinsic width in SVG coordinates.
    const actualWidth = canvas.getBBox().width
    const scale = (rotate % 180 === 0)
      ? clientWidth / actualWidth // rotation is 0 or 180 degrees.
      : clientHeight / actualWidth // rotation is 90 or 270 degrees.
    return Number.isNaN(scale) ? 1 : scale
  }
  // return a scale of 1 in JSDOM.
  return 1
}

/**
 * Use the scale (screen width / intrinsic SVG width) of the drawing canvas.
 * Useful for emulating `vector-effect:non-scaling-size` by inverting the scale.
 * ```jsx
 * // Use this inside an SVGContext.Provider.
 * const scale = useScale()
 * 
 * return (
 *  <g transform={`translate(50, 50) scale(${1 / scale})`}>
 *    <circle r={50} />
 *  </g>
 * )
 * ```
 * @returns {number} The scale of the drawing canvas. 
 * @default 1
 */
export default function useScale() {
  const svgContext = useContext(SVGContext)
  const initialScale = getScale(svgContext)
  const [scale, setScale] = useState(initialScale)

  setTimeout(() => {
    const newScale = getScale(svgContext)
    if (newScale !== scale) setScale(newScale)
  })

  return scale
}
