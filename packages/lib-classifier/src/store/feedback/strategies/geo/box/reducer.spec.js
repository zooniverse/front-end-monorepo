import geoBoxReducer from './reducer'

describe('feedback geo box reducer', function () {
  function buildRule () {
    return {
      height: '2000',
      hideSubjectViewer: true,
      id: 'dam-box',
      strategy: 'geoBox',
      successEnabled: true,
      successMessage: 'Success!',
      theta: '0',
      tolerance: '250',
      width: '3000',
      x: '-91.0',
      y: '48.0'
    }
  }

  function point (coordinates) {
    return {
      type: 'Feature',
      geometry: { type: 'Point', coordinates },
      properties: { toolIndex: 0 }
    }
  }

  function collection (features) {
    return { type: 'FeatureCollection', features }
  }

  it('should succeed for a point inside the box', function () {
    // ~745m east and ~557m north of center, inside 3000m x 2000m.
    const rule = geoBoxReducer(buildRule(), collection([point([-90.99, 48.005])]))
    expect(rule.success).to.be.true
    expect(rule.successfulClassifications).to.deep.equal([
      { coordinates: [-90.99, 48.005], type: 'Point' }
    ])
  })

  it('should fail for a point outside the box', function () {
    // ~2235m east of center, past the 1500m half-width plus 250m tolerance.
    const rule = geoBoxReducer(buildRule(), collection([point([-90.97, 48.0])]))
    expect(rule.success).to.be.false
    expect(rule.successfulClassifications).to.deep.equal([])
  })

  it('should succeed for a point outside the box but inside the tolerance', function () {
    // ~1600m east of center: past the 1500m half-width, inside the 250m margin.
    const rule = geoBoxReducer(buildRule(), collection([point([-90.9785, 48.0])]))
    expect(rule.success).to.be.true
  })

  it('should respect theta as clockwise rotation of the box', function () {
    // ~1000m north of center: outside a flat 3000m x 500m box, inside the same
    // box rotated 90 degrees (its long axis then points north).
    const target = point([-91.0, 48.0089832])

    const flat = buildRule()
    flat.height = '500'
    expect(geoBoxReducer(flat, collection([target])).success).to.be.false

    const rotated = buildRule()
    rotated.height = '500'
    rotated.theta = '90'
    expect(geoBoxReducer(rotated, collection([target])).success).to.be.true
  })

  it('should collect every point inside the box', function () {
    const rule = geoBoxReducer(buildRule(), collection([
      point([-90.99, 48.005]),
      point([-90.97, 48.0]),
      point([-91.0, 48.0])
    ]))
    expect(rule.success).to.be.true
    expect(rule.successfulClassifications).to.have.lengthOf(2)
  })

  it('should ignore non-Point features inside the box', function () {
    const lineString = {
      type: 'Feature',
      geometry: { type: 'LineString', coordinates: [[-91.0, 48.0], [-90.99, 48.005]] },
      properties: {}
    }
    const rule = geoBoxReducer(buildRule(), collection([lineString]))
    expect(rule.success).to.be.false
  })

  it('should fail for an empty FeatureCollection', function () {
    const rule = geoBoxReducer(buildRule(), collection([]))
    expect(rule.success).to.be.false
  })

  it('should fail for a null annotation value', function () {
    const rule = geoBoxReducer(buildRule(), null)
    expect(rule.success).to.be.false
  })

  it('should record results that survive serialization into classification metadata', function () {
    const rule = geoBoxReducer(buildRule(), collection([point([-90.99, 48.005])]))
    expect(() => JSON.stringify(rule)).to.not.throw()
  })
})
