export const POINT_CENTER_HIT_RADIUS_PIXELS = 10

export function isPixelNearPointCenter({
  pixel,
  pointPixel,
  radius = POINT_CENTER_HIT_RADIUS_PIXELS
}) {
  if (!Array.isArray(pixel) || !Array.isArray(pointPixel)) return false

  const deltaX = pixel[0] - pointPixel[0]
  const deltaY = pixel[1] - pointPixel[1]

  return (deltaX * deltaX) + (deltaY * deltaY) <= radius * radius
}