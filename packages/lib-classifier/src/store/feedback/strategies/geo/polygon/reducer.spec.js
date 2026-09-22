import strategy from './index'
import grader from '../grader'

const geoPolygonReducer = strategy.reducer

describe('feedback geo polygon reducer', function () {
  before(async function () {
    await grader.load()
  })

  function buildRule () {
    return {
      coordinates: [[-91.0, 48.0], [-90.98, 48.0], [-90.98, 48.01], [-91.0, 48.01]],
      id: 'pond',
      strategy: 'geoPolygon',
      successEnabled: true,
      successMessage: 'Success!',
      tolerance: '100'
    }
  }

  function point (coordinates) {
    return { type: 'Feature', geometry: { type: 'Point', coordinates }, properties: {} }
  }

  function collection (features) {
    return { type: 'FeatureCollection', features }
  }

  it('should succeed for a point inside the polygon', function () {
    const rule = geoPolygonReducer(buildRule(), collection([point([-90.99, 48.005])]))
    expect(rule.success).to.be.true
    expect(rule.successfulClassifications).to.deep.equal([{ coordinates: [-90.99, 48.005], type: 'Point' }])
  })

  it('should succeed for a point outside the polygon but inside the tolerance', function () {
    // ~50 m east of the eastern edge.
    expect(geoPolygonReducer(buildRule(), collection([point([-90.9793, 48.005])])).success).to.be.true
  })

  it('should fail for a point beyond the tolerance', function () {
    expect(geoPolygonReducer(buildRule(), collection([point([-90.97, 48.005])])).success).to.be.false
  })

  it('should accept an already-closed ring', function () {
    const rule = buildRule()
    rule.coordinates = [...rule.coordinates, rule.coordinates[0]]
    expect(geoPolygonReducer(rule, collection([point([-90.99, 48.005])])).success).to.be.true
  })

  it('should ignore LineString features', function () {
    const line = { type: 'Feature', geometry: { type: 'LineString', coordinates: [[-90.99, 48.005], [-90.985, 48.005]] }, properties: {} }
    expect(geoPolygonReducer(buildRule(), collection([line])).success).to.be.false
  })
})
