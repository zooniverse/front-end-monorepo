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

  describe('getStyles', function () {
    let mockFeature
    let geoDrawingTask

    beforeEach(function () {
      mockFeature = {
        get: (key) => {
          if (key === 'uncertainty_radius') return 500
          if (key === 'toolIndex') return 0
          return null
        }
      }

      geoDrawingTask = GeoDrawingTask.create({
        taskKey: 'T0',
        type: 'geoDrawing',
        tools: [
          {
            type: 'Point',
            color: '#ff0000',
            label: 'Test Point',
            uncertainty_circle: false
          }
        ]
      })
    })

    it('should return an array of styles', function () {
      const point = Point.create(basicSnapshot)
      const styles = point.getStyles({
        feature: mockFeature,
        geoDrawingTask,
        resolution: 10,
        isSelected: false
      })
      expect(styles).to.be.an('array')
      expect(styles.length).to.be.greaterThan(0)
    })

    it('should include uncertainty circle when tool has uncertainty_circle enabled', function () {
      geoDrawingTask = GeoDrawingTask.create({
        taskKey: 'T0',
        type: 'geoDrawing',
        tools: [
          {
            type: 'Point',
            color: '#ff0000',
            label: 'Test Point',
            uncertainty_circle: true
          }
        ]
      })
      const point = Point.create(basicSnapshot)
      const styles = point.getStyles({
        feature: mockFeature,
        geoDrawingTask,
        resolution: 10,
        isSelected: false
      })
      expect(styles).to.be.an('array')
      expect(styles.length).to.equal(2) // point and uncertainty circle
    })

    it('should not include uncertainty circle when tool has uncertainty_circle disabled', function () {
      const point = Point.create(basicSnapshot)
      const styles = point.getStyles({
        feature: mockFeature,
        geoDrawingTask,
        resolution: 10,
        isSelected: false
      })
      expect(styles).to.be.an('array')
      expect(styles.length).to.equal(1) // only point style
    })

    it('should not include uncertainty circle when uncertainty_radius is missing', function () {
      geoDrawingTask = GeoDrawingTask.create({
        taskKey: 'T0',
        type: 'geoDrawing',
        tools: [
          {
            type: 'Point',
            color: '#ff0000',
            label: 'Test Point',
            uncertainty_circle: true
          }
        ]
      })
      mockFeature = {
        get: (key) => {
          if (key === 'toolIndex') return 0
          return null // no uncertainty_radius
        }
      }
      const point = Point.create(basicSnapshot)
      const styles = point.getStyles({
        feature: mockFeature,
        geoDrawingTask,
        resolution: 10,
        isSelected: false
      })
      expect(styles).to.be.an('array')
      expect(styles.length).to.equal(1) // only point style
    })
  })
})
