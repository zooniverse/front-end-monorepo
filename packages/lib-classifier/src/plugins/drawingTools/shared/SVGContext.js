import { createContext } from 'react'

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
     * The SVG viewbox for the current subject.
     * @type {string}
     * @default ''
     */
    viewBox: '',
    /**
     * The rotation of the canvas.
     * @type {number}
     * @default 0
     */
    rotate: 0,
    /**
     * The width of the canvas.
     * @type {number}
     * @default 0
     */
    width: 0,
    /**
     * The height of the canvas.
     * @type {number}
     * @default 0
     */
    height: 0
})

export default SVGContext
