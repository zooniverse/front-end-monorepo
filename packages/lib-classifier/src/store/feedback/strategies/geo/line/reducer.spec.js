import strategy from './index'
import grader from '../grader'

const geoLineReducer = strategy.reducer

describe('feedback geo line reducer', function () {
  before(async function () {
    await grader.load()
  })

  function buildRule () {
    return {
      coordinates: [[-91.0, 48.0], [-90.99, 48.0], [-90.98, 48.001]],
      id: 'dam-crest',
      strategy: 'geoLine',
      successEnabled: true,
      successMessage: 'Success!',
      tolerance: '20'
    }
  }

  function lineString (coordinates) {
    return { type: 'Feature', geometry: { type: 'LineString', coordinates }, properties: {} }
  }

  function point (coordinates) {
    return { type: 'Feature', geometry: { type: 'Point', coordinates }, properties: {} }
  }

  function collection (features) {
    return { type: 'FeatureCollection', features }
  }

  it('should succeed for a trace that stays within tolerance of the target', function () {
    const trace = [[-91.0, 48.00005], [-90.99, 48.00005], [-90.98, 48.00105]]
    const rule = geoLineReducer(buildRule(), collection([lineString(trace)]))
    expect(rule.success).to.be.true
    expect(rule.successfulClassifications).to.deep.equal([{ coordinates: trace, type: 'LineString' }])
  })

  it('should succeed for a trace drawn in the opposite direction', function () {
    const trace = [[-90.98, 48.001], [-90.99, 48.0], [-91.0, 48.0]]
    expect(geoLineReducer(buildRule(), collection([lineString(trace)])).success).to.be.true
  })

  it('should fail for a trace that leaves the corridor', function () {
    // The middle vertex sits ~55 m north of the target, past the 20 m tolerance.
    const trace = [[-91.0, 48.0], [-90.99, 48.0005], [-90.98, 48.001]]
    const rule = geoLineReducer(buildRule(), collection([lineString(trace)]))
    expect(rule.success).to.be.false
    expect(rule.successfulClassifications).to.deep.equal([])
  })

  describe('with several dams in one target', function () {
    function multiRule () {
      return {
        coordinates: [
          [[-91.0, 48.0], [-90.99, 48.0]],
          [[-91.0, 47.99], [-90.99, 47.99]]
        ],
        id: 'dam-crest',
        strategy: 'geoLine',
        successEnabled: true,
        successMessage: 'Success!',
        tolerance: '20'
      }
    }

    it('should succeed for a trace on either dam', function () {
      expect(geoLineReducer(multiRule(), collection([lineString([[-91.0, 48.0], [-90.99, 48.0]])])).success).to.be.true
      expect(geoLineReducer(multiRule(), collection([lineString([[-91.0, 47.99], [-90.99, 47.99]])])).success).to.be.true
    })

    it('should fail for a trace on neither', function () {
      expect(geoLineReducer(multiRule(), collection([lineString([[-91.0, 47.95], [-90.99, 47.95]])])).success).to.be.false
    })
  })

  it('should ignore Point features', function () {
    expect(geoLineReducer(buildRule(), collection([point([-91.0, 48.0])])).success).to.be.false
  })

  it('should fail for an empty FeatureCollection and a null value', function () {
    expect(geoLineReducer(buildRule(), collection([])).success).to.be.false
    expect(geoLineReducer(buildRule(), null).success).to.be.false
  })
})
