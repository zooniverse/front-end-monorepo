const METERS_PER_DEGREE = 111320

// Corner lon/lats for a geoBox rule, the inverse of the geoBox reducer's rotate-project.
function boxCornersLonLat (rule) {
  const x = parseFloat(rule.x)
  const y = parseFloat(rule.y)
  const width = parseFloat(rule.width)
  const height = parseFloat(rule.height)
  const thetaRad = Math.PI * (-parseFloat(rule.theta || '0') / 180)

  const metersPerDegreeLon = METERS_PER_DEGREE * Math.cos((y * Math.PI) / 180)

  return [
    [-width / 2, -height / 2],
    [width / 2, -height / 2],
    [width / 2, height / 2],
    [-width / 2, height / 2]
  ].map(([cx, cy]) => {
    const mx = (cx * Math.cos(thetaRad)) - (cy * Math.sin(thetaRad))
    const my = (cx * Math.sin(thetaRad)) + (cy * Math.cos(thetaRad))
    return [x + (mx / metersPerDegreeLon), y + (my / METERS_PER_DEGREE)]
  })
}

export default boxCornersLonLat
