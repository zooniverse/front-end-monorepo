import boxCornersLonLat from './boxCornersLonLat'

describe('feedback boxCornersLonLat', function () {
  const rule = {
    height: '2000',
    theta: '0',
    width: '3000',
    x: '-91.0',
    y: '48.0'
  }

  it('should center the corners on the rule', function () {
    const corners = boxCornersLonLat(rule)
    const meanLon = corners.reduce((sum, c) => sum + c[0], 0) / 4
    const meanLat = corners.reduce((sum, c) => sum + c[1], 0) / 4
    expect(meanLon).to.be.closeTo(-91.0, 1e-9)
    expect(meanLat).to.be.closeTo(48.0, 1e-9)
  })

  it('should span width/height meters on the local tangent frame', function () {
    const [sw, se, , nw] = boxCornersLonLat(rule)
    const metersPerDegreeLon = 111320 * Math.cos((48.0 * Math.PI) / 180)
    expect((se[0] - sw[0]) * metersPerDegreeLon).to.be.closeTo(3000, 0.1)
    expect((nw[1] - sw[1]) * 111320).to.be.closeTo(2000, 0.1)
  })

  it('should rotate corners clockwise by theta', function () {
    const corners = boxCornersLonLat({ ...rule, height: '500', theta: '90' })
    // Rotated 90 degrees, the 3000m axis points north: latitude span is 3000m.
    const lats = corners.map(c => c[1])
    expect((Math.max(...lats) - Math.min(...lats)) * 111320).to.be.closeTo(3000, 0.1)
  })

  it('should default theta to 0', function () {
    const { theta, ...withoutTheta } = rule
    expect(boxCornersLonLat(withoutTheta)).to.deep.equal(boxCornersLonLat(rule))
  })
})
