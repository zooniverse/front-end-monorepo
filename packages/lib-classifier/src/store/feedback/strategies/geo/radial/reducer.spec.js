import geoRadialReducer from './reducer'

describe('feedback geo radial reducer', function () {
  function buildRule () {
    return {
      hideSubjectViewer: true,
      id: 'dam-radial',
      strategy: 'geoRadial',
      successEnabled: true,
      successMessage: 'Success!',
      tolerance: '1800',
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

  it('should succeed for a point near the target', function () {
    const rule = geoRadialReducer(buildRule(), collection([point([-91.001, 48.001])]))
    expect(rule.success).to.be.true
    expect(rule.successfulClassifications).to.deep.equal([
      { coordinates: [-91.001, 48.001], type: 'Point' }
    ])
  })

  it('should fail for a point far from the target', function () {
    const rule = geoRadialReducer(buildRule(), collection([point([-90.95, 48.02])]))
    expect(rule.success).to.be.false
    expect(rule.successfulClassifications).to.deep.equal([])
  })

  it('should measure ground meters, not degrees', function () {
    // 0.02 deg of longitude at latitude 48 is ~1490m on the ground; treating
    // degrees as isotropic would call it ~2226m and fail the 1800m tolerance.
    const rule = geoRadialReducer(buildRule(), collection([point([-90.98, 48.0])]))
    expect(rule.success).to.be.true
  })

  it('should fail just beyond the tolerance', function () {
    const rule = buildRule()
    rule.tolerance = '1400'
    expect(geoRadialReducer(rule, collection([point([-90.98, 48.0])])).success).to.be.false
  })

  it('should collect every point within tolerance', function () {
    const rule = geoRadialReducer(buildRule(), collection([
      point([-91.001, 48.001]),
      point([-90.95, 48.02]),
      point([-90.99, 48.0])
    ]))
    expect(rule.success).to.be.true
    expect(rule.successfulClassifications).to.have.lengthOf(2)
  })

  it('should ignore non-Point features near the target', function () {
    const lineString = {
      type: 'Feature',
      geometry: { type: 'LineString', coordinates: [[-91.001, 48.001], [-90.999, 48.0]] },
      properties: {}
    }
    const rule = geoRadialReducer(buildRule(), collection([lineString]))
    expect(rule.success).to.be.false
  })

  it('should fail for an empty FeatureCollection', function () {
    const rule = geoRadialReducer(buildRule(), collection([]))
    expect(rule.success).to.be.false
  })

  it('should fail for a null annotation value', function () {
    const rule = geoRadialReducer(buildRule(), null)
    expect(rule.success).to.be.false
  })

  it('should record results that survive serialization into classification metadata', function () {
    const rule = geoRadialReducer(buildRule(), collection([point([-91.001, 48.001])]))
    expect(() => JSON.stringify(rule)).to.not.throw()
  })
})
