const MIN_HEIGHT = 200
const MIN_WIDTH = 350

export default function getDefaultPosition(bounds = {}, minHeight = MIN_HEIGHT, minWidth = MIN_WIDTH) {
  const viewport = {
    height: window?.innerHeight,
    width: window?.innerWidth
  }
  // Calculate default position
  let x = 0
  let y = 0

  /*
  Note: since we're using a modal that covers the entire screen, we only need
  to calculate the position of the mark relative to the x-y coordinates of the
  whole screen. We do not, for example, need to offset the x-y of the parent
  <SVG>
  */

  if (bounds) {
    const markX = bounds.x || 0
    const markY = bounds.y || 0
    const markWidth = bounds.width || 0
    const markHeight = bounds.height || 0

    const xOffset = markWidth * 0.5
    let yOffset = markHeight

    // Get the distance from the bottom of the mark to the bottom of the viewport.
    const verticalSpace = viewport.height - (markY + markHeight)
    // If the available space is too small, push the popup upwards.
    if (verticalSpace < minHeight) {
      yOffset = 0 - (minHeight + markHeight)
    }

    x = markX + xOffset
    y = markY + yOffset
  }

  // Keep within bounds of the viewport
  const leftLimit = 0
  const topLimit = 0
  const rightLimit = viewport.width - minWidth || 0
  const bottomLimit = viewport.height - minHeight || 0

  x = Math.max(x, leftLimit)
  y = Math.max(y, topLimit)
  x = Math.min(x, rightLimit)
  y = Math.min(y, bottomLimit)

  return { x, y }
}