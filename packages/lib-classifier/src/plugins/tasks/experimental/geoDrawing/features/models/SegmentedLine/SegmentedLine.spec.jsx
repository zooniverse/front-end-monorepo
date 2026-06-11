import SegmentedLine from './SegmentedLine'
import GeoDrawingTask from '../../../task/models/GeoDrawingTask'

describe('Model > SegmentedLine', function () {
  const basicSnapshot = {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [[2.29, 48.85], [2.30, 48.86], [2.31, 48.87]]
    },
    properties: {}
  }

  it('should exist', function () {
    const lineString = SegmentedLine.create(basicSnapshot)
    expect(lineString).to.exist
    expect(lineString).to.be.an('object')
  })

  describe('preProcessSnapshot', function () {
    it('should handle plain GeoJSON object', function () {
      const snapshot = {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [[10, 20], [11, 21], [12, 22]]
        },
        properties: { name: 'Test line' }
      }
      const lineString = SegmentedLine.create(snapshot)
      expect(lineString.geometry.type).to.equal('LineString')
      expect(lineString.geometry.coordinates).to.deep.equal([[10, 20], [11, 21], [12, 22]])
      expect(lineString.properties.name).to.equal('Test line')
    })

    it('should handle OpenLayers Geometry object', function () {
      const mockOLGeometry = {
        getType: () => 'LineString',
        getCoordinates: () => [[5, 15], [6, 16]]
      }
      const snapshot = {
        geometry: mockOLGeometry
      }
      const lineString = SegmentedLine.create(snapshot)
      expect(lineString.geometry.type).to.equal('LineString')
      expect(lineString.geometry.coordinates).to.deep.equal([[5, 15], [6, 16]])
    })

    it('should default to empty coordinates if missing', function () {
      const snapshot = {
        geometry: {}
      }
      const lineString = SegmentedLine.create(snapshot)
      expect(lineString.geometry.coordinates).to.deep.equal([])
    })

    it('should default type to "LineString" if missing', function () {
      const snapshot = {
        geometry: {
          coordinates: [[1, 2], [3, 4]]
        }
      }
      const lineString = SegmentedLine.create(snapshot)
      expect(lineString.geometry.type).to.equal('LineString')
    })
  })

  describe('> Views', function () {
    describe('getCoordinates', function () {
      it('should return OL feature coordinates when available', function () {
        const mockFeature = {
          getGeometry: () => ({
            getCoordinates: () => [[10, 20], [11, 21]]
          })
        }
        const lineString = SegmentedLine.create(basicSnapshot)
        const coords = lineString.getCoordinates({ feature: mockFeature })
        expect(coords).to.deep.equal([[10, 20], [11, 21]])
      })

      it('should return model coordinates as fallback', function () {
        const mockFeature = {}
        const lineString = SegmentedLine.create(basicSnapshot)
        const coords = lineString.getCoordinates({ feature: mockFeature })
        expect(coords).to.deep.equal([[2.29, 48.85], [2.30, 48.86], [2.31, 48.87]])
      })
    })

    describe('getTool', function () {
      it('should return tool by toolIndex from feature', function () {
        const mockFeature = {
          get: (key) => key === 'toolIndex' ? 1 : null
        }
        const geoDrawingTask = GeoDrawingTask.create({
          taskKey: 'T0',
          type: 'geoDrawing',
          tools: [
            { type: 'Point', label: 'Point' },
            { type: 'SegmentedLine', color: '#00ff00', label: 'Dam crest' }
          ]
        })
        const lineString = SegmentedLine.create(basicSnapshot)
        const tool = lineString.getTool({ feature: mockFeature, geoDrawingTask })
        expect(tool?.type).to.equal('SegmentedLine')
        expect(tool?.label).to.equal('Dam crest')
      })

      it('should fall back to first SegmentedLine tool when no toolIndex', function () {
        const mockFeature = { get: () => null }
        const geoDrawingTask = GeoDrawingTask.create({
          taskKey: 'T0',
          type: 'geoDrawing',
          tools: [
            { type: 'Point', label: 'Point' },
            { type: 'SegmentedLine', color: '#00ff00', label: 'Dam crest' }
          ]
        })
        const lineString = SegmentedLine.create(basicSnapshot)
        const tool = lineString.getTool({ feature: mockFeature, geoDrawingTask })
        expect(tool?.type).to.equal('SegmentedLine')
      })
    })

    describe('getStyles', function () {
      const mockFeature = {
        get: (key) => key === 'toolIndex' ? 0 : null,
        getGeometry: () => ({
          getCoordinates: () => [[2.29, 48.85], [2.30, 48.86]]
        })
      }
      const geoDrawingTask = GeoDrawingTask.create({
        taskKey: 'T0',
        type: 'geoDrawing',
        tools: [
          { type: 'SegmentedLine', color: '#00ff00', label: 'Dam crest' }
        ]
      })

      it('should return at least one stroke style when not selected', function () {
        const lineString = SegmentedLine.create(basicSnapshot)
        const styles = lineString.getStyles({ feature: mockFeature, geoDrawingTask, isSelected: false })
        expect(styles).to.be.an('array')
        expect(styles.length).to.equal(1)
        expect(styles[0].getStroke()).to.exist
      })

      it('should add per-vertex circle styles when selected', function () {
        const lineString = SegmentedLine.create(basicSnapshot)
        const styles = lineString.getStyles({ feature: mockFeature, geoDrawingTask, isSelected: true })
        expect(styles.length).to.equal(3)
        expect(styles[0].getStroke()).to.exist
        expect(styles[1].getImage()).to.exist
        expect(styles[2].getImage()).to.exist
      })

    })
  })
})
