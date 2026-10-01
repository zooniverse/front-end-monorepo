import grader from './index'

describe('feedback geo grader', function () {
  function point (coordinates) {
    return { type: 'Feature', geometry: { type: 'Point', coordinates }, properties: {} }
  }

  function lineString (coordinates) {
    return { type: 'Feature', geometry: { type: 'LineString', coordinates }, properties: {} }
  }

  describe('load', function () {
    it('should resolve once and memoize', async function () {
      const first = grader.load()
      const second = grader.load()
      expect(first).to.equal(second)
      await first
      expect(grader.isLoaded()).to.be.true
    })
  })

  describe('grade', function () {
    before(async function () {
      await grader.load()
    })

    describe('with a Point target', function () {
      const rule = { geometry: { type: 'Point', coordinates: [-91.0, 48.0] }, tolerance: '1800' }

      it('should match a point within the radius', function () {
        const matches = grader.grade(rule, [point([-91.001, 48.001])])
        expect(matches).to.deep.equal([{ coordinates: [-91.001, 48.001], type: 'Point' }])
      })

      it('should not match a point outside the radius', function () {
        expect(grader.grade(rule, [point([-90.95, 48.02])])).to.deep.equal([])
      })

      it('should measure ground meters, not degrees', function () {
        // 0.02 deg of longitude at latitude 48 is ~1490 m; isotropic degrees would say ~2226 m.
        expect(grader.grade(rule, [point([-90.98, 48.0])])).to.have.lengthOf(1)
        expect(grader.grade({ ...rule, tolerance: '1400' }, [point([-90.98, 48.0])])).to.deep.equal([])
      })

      it('should wrap across the antimeridian', function () {
        const dateline = { geometry: { type: 'Point', coordinates: [179.999, 0] }, tolerance: '500' }
        expect(grader.grade(dateline, [point([-179.999, 0])])).to.have.lengthOf(1)
      })

      it('should only consider features of the accepted geometry types', function () {
        const line = lineString([[-91.001, 48.001], [-90.999, 48.0]])
        expect(grader.grade(rule, [line])).to.deep.equal([])
        expect(grader.grade(rule, [line], ['LineString'])).to.have.lengthOf(1)
      })
    })

    describe('with a LineString target', function () {
      const rule = {
        geometry: { type: 'LineString', coordinates: [[-91.0, 48.0], [-90.99, 48.0], [-90.98, 48.001]] },
        tolerance: '20'
      }

      it('should match a trace that stays inside the corridor', function () {
        const trace = lineString([[-91.0, 48.00005], [-90.99, 48.00005], [-90.98, 48.00105]])
        const matches = grader.grade(rule, [trace], ['LineString'])
        expect(matches).to.deep.equal([{ coordinates: trace.geometry.coordinates, type: 'LineString' }])
      })

      it('should not match a trace that leaves the corridor', function () {
        const trace = lineString([[-91.0, 48.0], [-90.99, 48.0005], [-90.98, 48.001]])
        expect(grader.grade(rule, [trace], ['LineString'])).to.deep.equal([])
      })
    })

    describe('with a Polygon target', function () {
      const ring = [[-91.0, 48.0], [-90.98, 48.0], [-90.98, 48.01], [-91.0, 48.01], [-91.0, 48.0]]
      const rule = { geometry: { type: 'Polygon', coordinates: [ring] }, tolerance: '100' }

      it('should match a point inside the polygon', function () {
        expect(grader.grade(rule, [point([-90.99, 48.005])])).to.have.lengthOf(1)
      })

      it('should match a point just outside the polygon but inside the tolerance', function () {
        // ~50 m east of the eastern edge.
        expect(grader.grade(rule, [point([-90.9793, 48.005])])).to.have.lengthOf(1)
      })

      it('should not match a point beyond the tolerance', function () {
        expect(grader.grade(rule, [point([-90.97, 48.005])])).to.deep.equal([])
      })
    })

    it('should ignore features without finite coordinates', function () {
      const rule = { geometry: { type: 'Point', coordinates: [-91.0, 48.0] }, tolerance: '1800' }
      expect(grader.grade(rule, [point(['a', null]), point([])])).to.deep.equal([])
    })
  })

  describe('targetGeometry', function () {
    before(async function () {
      await grader.load()
    })

    it('should return the buffered target as a GeoJSON Polygon', function () {
      const rule = { geometry: { type: 'Point', coordinates: [-91.0, 48.0] }, tolerance: '1800' }
      const geometry = grader.targetGeometry(rule)
      expect(geometry.type).to.equal('Polygon')
      const lons = geometry.coordinates[0].map(([lon]) => lon)
      // 1800 m at latitude 48 is ~0.024 degrees of longitude.
      expect(Math.max(...lons) - Math.min(...lons)).to.be.closeTo(0.048, 0.002)
    })
  })
})
