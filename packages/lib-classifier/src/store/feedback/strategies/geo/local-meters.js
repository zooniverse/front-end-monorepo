const METERS_PER_DEGREE = 111320

// Wrap to the nearest world copy so cross-dateline offsets stay short.
function wrapDegrees (degrees) {
  return ((degrees + 540) % 360) - 180
}

// Offset of a lon/lat point from a lon/lat origin, in ground meters on a local
// tangent frame at the origin, where east-west meters shrink by cos(latitude).
function localMeters (lon, lat, originLon, originLat) {
  const dx = wrapDegrees(lon - originLon) * METERS_PER_DEGREE * Math.cos((originLat * Math.PI) / 180)
  const dy = (lat - originLat) * METERS_PER_DEGREE
  return { dx, dy }
}

export default localMeters
