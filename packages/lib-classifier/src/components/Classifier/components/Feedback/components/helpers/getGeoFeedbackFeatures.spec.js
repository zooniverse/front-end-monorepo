import getGeoFeedbackFeatures from './getGeoFeedbackFeatures'
import grader from '@store/feedback/strategies/geo/grader'
import GeoDrawingTask from '@plugins/tasks/experimental/geoDrawing/task/models/GeoDrawingTask'
import FEEDBACK_COLORS from '@store/feedback/helpers/feedback-colors'

describe('feedback getGeoFeedbackFeatures', function () {
  before(async function () {
    await grader.load()
  })

  const radialRule = {
    id: 'dam-radial',
    strategy: 'geoRadial',
    success: true,
    successfulClassifications: [{ coordinates: [-91.001, 48.001], type: 'Point' }],
    tolerance: '2000',
    x: '-91.0',
    y: '48.0'
  }

  const boxRule = {
    id: 'dam-box',
    strategy: 'geoBox',
    success: false,
    successfulClassifications: [],
    height: '2000',
    theta: '0',
    tolerance: '250',
    width: '3000',
    x: '-91.0',
    y: '48.0'
  }

  function geoAnnotation (coordinatesList) {
    return {
      taskType: 'geoDrawing',
      value: {
        type: 'FeatureCollection',
        features: coordinatesList.map(coordinates => ({
          type: 'Feature',
          geometry: { type: 'Point', coordinates },
          properties: {}
        }))
      }
    }
  }

  it('should build a polygon per rule plus a point per volunteer point', function () {
    const features = getGeoFeedbackFeatures([geoAnnotation([[-91.001, 48.001]])], [radialRule, boxRule])
    const types = features.map(feature => feature.getGeometry().getType())
    expect(types).to.deep.equal(['Polygon', 'Polygon', 'Point'])
  })

  it('should color rules by success and failure', function () {
    const [radial, box] = getGeoFeedbackFeatures([], [radialRule, boxRule])
    expect(radial.getStyle().getStroke().getColor()).to.equal(FEEDBACK_COLORS.success)
    expect(box.getStyle().getStroke().getColor()).to.equal(FEEDBACK_COLORS.failure)
  })

  it('should color volunteer points by membership in successfulClassifications when no tool color is known', function () {
    const features = getGeoFeedbackFeatures(
      [geoAnnotation([[-91.001, 48.001], [-90.9, 48.1]])],
      [radialRule]
    )
    const [, hit, miss] = features
    expect(hit.getStyle().getImage().getStroke().getColor()).to.equal(FEEDBACK_COLORS.success)
    expect(miss.getStyle().getImage().getStroke().getColor()).to.equal(FEEDBACK_COLORS.failure)
  })

  it('should draw volunteer lines and color them by membership in successfulClassifications when no tool color is known', function () {
    const trace = [[-91.0, 48.0], [-90.99, 48.0]]
    const lineRule = {
      ...radialRule,
      successfulClassifications: [{ coordinates: trace, type: 'LineString' }]
    }
    const annotation = {
      taskType: 'geoDrawing',
      value: {
        type: 'FeatureCollection',
        features: [
          { type: 'Feature', geometry: { type: 'LineString', coordinates: trace }, properties: {} },
          { type: 'Feature', geometry: { type: 'LineString', coordinates: [[-90.9, 48.1], [-90.8, 48.1]] }, properties: {} }
        ]
      }
    }
    const [, hit, miss] = getGeoFeedbackFeatures([annotation], [lineRule])
    expect(hit.getGeometry().getType()).to.equal('LineString')
    expect(hit.getStyle().getStroke().getColor()).to.equal(FEEDBACK_COLORS.success)
    expect(miss.getStyle().getStroke().getColor()).to.equal(FEEDBACK_COLORS.failure)
  })

  it('should outline rule regions with a dashed line so they read apart from volunteer marks', function () {
    const trace = [[-91.0, 48.0], [-90.99, 48.0]]
    const annotation = {
      taskType: 'geoDrawing',
      value: {
        type: 'FeatureCollection',
        features: [{ type: 'Feature', geometry: { type: 'LineString', coordinates: trace }, properties: {} }]
      }
    }
    const [rule, mark] = getGeoFeedbackFeatures([annotation], [radialRule])
    expect(rule.getStyle().getStroke().getLineDash()).to.have.length.above(0)
    expect(mark.getStyle().getStroke().getLineDash() ?? []).to.have.lengthOf(0)
  })

  describe('with the geoDrawing task', function () {
    const task = GeoDrawingTask.create({
      taskKey: 'T0',
      tools: [
        { color: '#00ffaa', label: 'Dam', type: 'Point' },
        { color: '#ff00ff', label: 'Lodge', type: 'Point' },
        { color: '#aa66ff', label: 'Channel', type: 'SegmentedLine' }
      ],
      type: 'geoDrawing'
    })

    const annotation = {
      taskType: 'geoDrawing',
      value: {
        type: 'FeatureCollection',
        features: [
          { type: 'Feature', geometry: { type: 'Point', coordinates: [-91.001, 48.001] }, properties: { toolIndex: 0 } },
          { type: 'Feature', geometry: { type: 'Point', coordinates: [-90.9, 48.1] }, properties: { toolIndex: 1 } },
          { type: 'Feature', geometry: { type: 'LineString', coordinates: [[-90.9, 48.1], [-90.8, 48.1]] }, properties: {} }
        ]
      }
    }

    it('should draw each volunteer mark in the color of the tool that made it', function () {
      const [, hit, miss, line] = getGeoFeedbackFeatures([annotation], [radialRule], task)
      expect(hit.getStyle().getImage().getStroke().getColor()).to.equal('#00ffaa')
      expect(miss.getStyle().getImage().getStroke().getColor()).to.equal('#ff00ff')
      expect(line.getStyle().getStroke().getColor()).to.equal('#aa66ff')
    })

    it('should keep rule regions colored by success and failure', function () {
      const [radial, box] = getGeoFeedbackFeatures([annotation], [radialRule, boxRule], task)
      expect(radial.getStyle().getStroke().getColor()).to.equal(FEEDBACK_COLORS.success)
      expect(box.getStyle().getStroke().getColor()).to.equal(FEEDBACK_COLORS.failure)
    })
  })

  it('should ignore annotations from other task types', function () {
    const drawingAnnotation = { taskType: 'drawing', value: [{ x: 1, y: 2 }] }
    expect(getGeoFeedbackFeatures([drawingAnnotation], [])).to.deep.equal([])
  })

  it('should skip rules with unknown strategies', function () {
    const features = getGeoFeedbackFeatures([], [{ ...radialRule, strategy: 'radial' }])
    expect(features).to.deep.equal([])
  })
})
