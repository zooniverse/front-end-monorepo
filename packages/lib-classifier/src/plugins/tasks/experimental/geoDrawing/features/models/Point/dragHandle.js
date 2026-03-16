import Icon from 'ol/style/Icon'

const DRAG_HANDLE_LEFT_EXTENT_PIXELS = 19
const DRAG_HANDLE_RIGHT_EXTENT_PIXELS = 19
const DRAG_HANDLE_INNER_STROKE_WIDTH = 1.5
const DRAG_HANDLE_HEIGHT_PIXELS = 20
const DRAG_HANDLE_ARROW_HEAD_BASE_SIZE_PIXELS = 3
const DRAG_HANDLE_ARROW_HEAD_WIDTH_PIXELS = 8

const dragHandleIconCache = new Map()

function getDragHandleDimensions() {
  const width = DRAG_HANDLE_LEFT_EXTENT_PIXELS + DRAG_HANDLE_RIGHT_EXTENT_PIXELS
  const centerX = DRAG_HANDLE_LEFT_EXTENT_PIXELS
  const centerY = DRAG_HANDLE_HEIGHT_PIXELS / 2

  return {
    centerX,
    centerY,
    height: DRAG_HANDLE_HEIGHT_PIXELS,
    width
  }
}

function createArrowLineMarkup({ stroke, strokeWidth }) {
  const { centerY, width } = getDragHandleDimensions()
  const westArrowBaseX = DRAG_HANDLE_ARROW_HEAD_WIDTH_PIXELS
  const eastArrowBaseX = width - DRAG_HANDLE_ARROW_HEAD_WIDTH_PIXELS

  return [
    '<line',
    `x1="${westArrowBaseX}"`,
    `y1="${centerY}"`,
    `x2="${eastArrowBaseX}"`,
    `y2="${centerY}"`,
    `stroke="${stroke}"`,
    `stroke-width="${strokeWidth}"`,
    'stroke-linecap="round"/>'
  ].join(' ')
}

function createWestArrowHeadMarkup({ stroke, strokeWidth }) {
  const { centerY } = getDragHandleDimensions()
  const tipX = 0
  const baseX = DRAG_HANDLE_ARROW_HEAD_WIDTH_PIXELS
  const headSize = DRAG_HANDLE_ARROW_HEAD_BASE_SIZE_PIXELS + (strokeWidth / 2)
  const upperBasePoint = `${baseX},${centerY - headSize}`
  const tipPoint = `${tipX},${centerY}`
  const lowerBasePoint = `${baseX},${centerY + headSize}`

  const points = [upperBasePoint, tipPoint, lowerBasePoint].join(' ')

  return [
    '<polygon',
    `points="${points}"`,
    `fill="${stroke}"/>`
  ].join(' ')
}

function createEastArrowHeadMarkup({ stroke, strokeWidth }) {
  const { centerY, width } = getDragHandleDimensions()
  const tipX = width
  const baseX = width - DRAG_HANDLE_ARROW_HEAD_WIDTH_PIXELS
  const headSize = DRAG_HANDLE_ARROW_HEAD_BASE_SIZE_PIXELS + (strokeWidth / 2)
  const upperBasePoint = `${baseX},${centerY - headSize}`
  const tipPoint = `${tipX},${centerY}`
  const lowerBasePoint = `${baseX},${centerY + headSize}`

  const points = [upperBasePoint, tipPoint, lowerBasePoint].join(' ')

  return [
    '<polygon',
    `points="${points}"`,
    `fill="${stroke}"/>`
  ].join(' ')
}

function createDragHandleMarkup(color) {
  const { height, width } = getDragHandleDimensions()

  return [
    `<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${width}"
      height="${height}"
      viewBox="0 0 ${width} ${height}"
    >`,
    `<rect
      x="0"
      y="0"
      width="${width}"
      height="${height}"
      fill="transparent"
      stroke="transparent"
    />`,
    createArrowLineMarkup({
      stroke: color,
      strokeWidth: DRAG_HANDLE_INNER_STROKE_WIDTH
    }),
    createWestArrowHeadMarkup({
      stroke: color,
      strokeWidth: DRAG_HANDLE_INNER_STROKE_WIDTH
    }),
    createEastArrowHeadMarkup({
      stroke: color,
      strokeWidth: DRAG_HANDLE_INNER_STROKE_WIDTH
    }),
    '</svg>'
  ].join('')
}

export function getDragHandleIcon(color) {
  if (!dragHandleIconCache.has(color)) {
    const { height, width } = getDragHandleDimensions()

    dragHandleIconCache.set(color, new Icon({
      anchor: [DRAG_HANDLE_LEFT_EXTENT_PIXELS / width, 0.5],
      anchorXUnits: 'fraction',
      anchorYUnits: 'fraction',
      imgSize: [width, height],
      src: `data:image/svg+xml;utf8,${encodeURIComponent(createDragHandleMarkup(color))}`
    }))
  }

  return dragHandleIconCache.get(color)
}

export function isPixelNearDragHandle({ pixel, handlePixel, tolerance = 15 }) {
  if (!Array.isArray(pixel) || !Array.isArray(handlePixel)) return false

  const deltaX = pixel[0] - handlePixel[0]
  const westTolerance = DRAG_HANDLE_LEFT_EXTENT_PIXELS + tolerance
  const eastTolerance = DRAG_HANDLE_RIGHT_EXTENT_PIXELS + tolerance
  const verticalTolerance = Math.max(tolerance, 10)

  return deltaX >= -westTolerance
    && deltaX <= eastTolerance
    && Math.abs(pixel[1] - handlePixel[1]) <= verticalTolerance
}
