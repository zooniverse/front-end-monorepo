import { useContext, useState } from 'react'

import SVGContext, { DEFAULT_TRANSFORM_MATRIX } from '../shared/SVGContext'

/**
 * Get the scale (screen width / intrinsic width) of the zoomed and rotated drawing canvas.
 * @param {Object} svgContext - The drawing canvas context.
 * @returns {number} The scale of the drawing canvas.
 * @default 1
 */
function getScale(svgContext) {
  const { transformMatrix = DEFAULT_TRANSFORM_MATRIX, rotate = 0 } = svgContext
  const scale = (rotate % 180 === 0)
    ? transformMatrix.scaleX // rotation is 0 or 180 degrees.
    : transformMatrix.scaleY // rotation is 90 or 270 degrees.
  return Number.isNaN(scale) ? 1 : scale
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
