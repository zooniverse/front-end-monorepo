export default function getDefaultPosition (params) {
  const {
    bounds = {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    },
    minHeight = 250,
    minWidth = 350
  } = params
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

    x = markX + markWidth * 0.5
    y = markY + markHeight * 0.5
  }

  // Keep within bounds of the viewport
  const leftLimit = 0
  const topLimit = 0
  const rightLimit = (window && window.innerWidth || 0) - minWidth
  const bottomLimit = (window && window.innerHeight || 0) - minHeight

  x = Math.max(x, leftLimit)
  y = Math.max(y, topLimit)
  x = Math.min(x, rightLimit)
  y = Math.min(y, bottomLimit)

  return { x, y }
}