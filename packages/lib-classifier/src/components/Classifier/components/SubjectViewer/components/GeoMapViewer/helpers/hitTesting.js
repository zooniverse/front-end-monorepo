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

// After normalization a canonical X may not match the on-screen world copy; return all candidates.
export function getFeaturePixelsAcrossWorldCopies(map, coord) {
  const extent = map.getView().getProjection().getExtent()
  const worldWidth = extent ? extent[2] - extent[0] : 0
  const offsets = worldWidth > 0 ? [-worldWidth, 0, worldWidth] : [0]
  return offsets
    .map(offset => map.getPixelFromCoordinate([coord[0] + offset, coord[1]]))
    .filter(Boolean)
}
