import { createContext } from 'react'

export const DEFAULT_TRANSFORM_MATRIX = {
  scaleX: 1,
  scaleY: 1,
  skewX: 0,
  skewY: 0,
  translateX: 0,
  translateY: 0
}
/**
 * Canvas context for drawing tools.
 */
const SVGContext = createContext({
  /**
   * The drawing canvas node from the DOM.
   * @type {SVGGraphicsElement}
   * @default null
   */
  canvas: null,
  /**
   * The rotation of the canvas.
   * @type {number}
   * @default 0
   */
  rotate: 0,
  /**
   * The transformation matrix of the canvas.
   * @typedef {Object} TransformMatrix
   * @property {number} scaleX - The scale factor in the X direction.
   * @property {number} scaleY - The scale factor in the Y direction.
   * @property {number} skewX - The skew factor in the X direction.
   * @property {number} skewY - The skew factor in the Y direction.
   * @property {number} translateX - The translation in the X direction.
   * @property {number} translateY - The translation in the Y direction.
   * @type {TransformMatrix}
   * @default
   */
  transformMatrix: DEFAULT_TRANSFORM_MATRIX,
})

export default SVGContext
