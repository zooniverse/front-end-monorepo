import { useContext, useState } from 'react'

import SVGContext from '../shared/SVGContext'

/**
 * Get the rotation angle of the drawing canvas.
 * @param {SVGGraphicsElement} node - An SVG node on the drawing canvas.
 * @returns {number} The rotation angle of the drawing canvas.
 * @default 0
 */
function getRotationAngle(node) {
  const transformRoot = node.closest('g[transform]')
  if (transformRoot) {
    const transformList = transformRoot.transform?.baseVal
    // the rotation transform is the only item in the list.
    const transform = transformList?.numberOfItems > 0
      ? transformList.getItem(0)
      : null
    return transform?.angle || 0
  }
  return 0
}

/**
 * Get the scale (screen width / intrinsic width) of the zoomed and rotated drawing canvas.
 * @param {SVGGraphicsElement} canvas - The drawing canvas node from the DOM.
 * @returns {number} The scale of the drawing canvas.
 * @default 1
 */
function getScale(canvas) {
  // JSDOM doesn't support SVG, so we need to check for `getBBox` to run the tests.
  if (canvas?.getBBox) {
    const { width: clientWidth, height: clientHeight } = canvas.getBoundingClientRect()
    const actualWidth = canvas.getBBox().width
    const rotationAngle = getRotationAngle(canvas)
    const scale = (rotationAngle % 180 === 0)
      ? clientWidth / actualWidth // rotation is 0 or 180 degrees.
      : clientHeight / actualWidth // rotation is 90 or 270 degrees.
    return !Number.isNaN(scale) ? scale : 1
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
  const { canvas } = useContext(SVGContext)
  const [scale, setScale] = useState(1)

  setTimeout(() => {
    const newScale = getScale(canvas)
    if (newScale !== scale) setScale(newScale)
  })

  return scale
}
