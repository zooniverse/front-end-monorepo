import Point from './Point'
import GeoDrawingTask from '../../../task/models/GeoDrawingTask'

describe('Model > Point', function () {
  const basicSnapshot = {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [2.2944810, 48.8583701]
    },
    properties: {}
  }

  it('should exist', function () {
    const point = Point.create(basicSnapshot)
    expect(point).to.exist
    expect(point).to.be.an('object')
  })

  describe('preProcessSnapshot', function () {
    it('should handle plain GeoJSON object', function () {
      const snapshot = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [10, 20]
        },
        properties: {
          uncertainty_radius: 100
        }
      }
      const point = Point.create(snapshot)
      expect(point.geometry.type).to.equal('Point')
      expect(point.geometry.coordinates).to.deep.equal([10, 20])
      expect(point.properties.uncertainty_radius).to.equal(100)
    })

    it('should handle OpenLayers Geometry object', function () {
      const mockOLGeometry = {
        getType: () => 'Point',
        getCoordinates: () => [5, 15]
      }
      const snapshot = {
        geometry: mockOLGeometry,
        properties: {
          uncertainty_radius: 50
        }
      }
      const point = Point.create(snapshot)
      expect(point.geometry.type).to.equal('Point')
      expect(point.geometry.coordinates).to.deep.equal([5, 15])
      expect(point.properties.uncertainty_radius).to.equal(50)
    })

    it('should default to empty coordinates if missing', function () {
      const snapshot = {
        geometry: {}
      }
      const point = Point.create(snapshot)
      expect(point.geometry.coordinates).to.deep.equal([])
    })

    it('should default type to "Point" if missing', function () {
      const snapshot = {
        geometry: {
          coordinates: [1, 2]
        }
      }
      const point = Point.create(snapshot)
      expect(point.geometry.type).to.equal('Point')
    })
  })

  describe('> Views', function () {
    describe('getCenterCoordinates', function () {
      it('should return OL feature coordinates', function () {
        const mockFeature = {
          getGeometry: () => ({
            getCoordinates: () => [10, 20]
          })
        }
        const point = Point.create(basicSnapshot)
        const center = point.getCenterCoordinates({ feature: mockFeature })
        expect(center).to.deep.equal([10, 20])
      })

      it('should return model coordinates as fallback', function () {
        const mockFeature = {}
        const point = Point.create(basicSnapshot)
        const center = point.getCenterCoordinates({ feature: mockFeature })
        expect(center).to.deep.equal([2.2944810, 48.8583701])
      })
    })

    describe('getDragHandleCoordinates', function () {
      it('should return handle at right edge of uncertainty circle', function () {
        const mockFeature = {
          get: (key) => {
            if (key === 'uncertainty_radius') return 100
            if (key === 'toolIndex') return 0
            return null
          },
          getGeometry: () => ({
            getCoordinates: () => [10, 20]
          })
        }
        const geoDrawingTask = GeoDrawingTask.create({
          taskKey: 'T0',
          type: 'geoDrawing',
          tools: [
            {
              type: 'Point',
              color: '#ff0000',
              label: 'Test',
              uncertainty_circle: true
            }
          ]
        })
        const point = Point.create(basicSnapshot)
        const handle = point.getDragHandleCoordinates({ feature: mockFeature, geoDrawingTask })
        expect(handle).to.deep.equal([110, 20]) // center[0] + radius
      })
    })

    describe('getUncertaintyRadius', function () {
      it('should return radius when tool has uncertainty_circle enabled', function () {
        const mockFeature = {
          get: (key) => {
            if (key === 'uncertainty_radius') return 500
            if (key === 'toolIndex') return 0
            return null
          }
        }
        const geoDrawingTask = GeoDrawingTask.create({
          taskKey: 'T0',
          type: 'geoDrawing',
          tools: [
            {
              type: 'Point',
              color: '#ff0000',
              label: 'Test',
              uncertainty_circle: true
            }
          ]
        })
        const point = Point.create(basicSnapshot)
        const radius = point.getUncertaintyRadius({ feature: mockFeature, geoDrawingTask })
        expect(radius).to.equal(500)
      })

      it('should return null when tool has uncertainty_circle disabled', function () {
        const mockFeature = {
          get: (key) => {
            if (key === 'uncertainty_radius') return 500
            if (key === 'toolIndex') return 0
            return null
          }
        }
        const geoDrawingTask = GeoDrawingTask.create({
          taskKey: 'T0',
          type: 'geoDrawing',
          tools: [
            {
              type: 'Point',
              color: '#ff0000',
              label: 'Test',
              uncertainty_circle: false
            }
          ]
        })
        const point = Point.create(basicSnapshot)
        const radius = point.getUncertaintyRadius({ feature: mockFeature, geoDrawingTask })
        expect(radius).to.equal(null)
      })
    })

    describe('getUncertaintyRadiusPixels', function () {
      it('should convert coordinate units to pixels using resolution', function () {
        const mockFeature = {
          get: (key) => {
            if (key === 'uncertainty_radius') return 100
            if (key === 'toolIndex') return 0
            return null
          }
        }
        const geoDrawingTask = GeoDrawingTask.create({
          taskKey: 'T0',
          type: 'geoDrawing',
          tools: [
            {
              type: 'Point',
              color: '#ff0000',
              label: 'Test',
              uncertainty_circle: true
            }
          ]
        })
        const point = Point.create(basicSnapshot)
        const radiusPixels = point.getUncertaintyRadiusPixels({ 
          feature: mockFeature, 
          geoDrawingTask,
          resolution: 10
        })
        expect(radiusPixels).to.equal(10) // 100 / 10
      })
    })
  })
})
