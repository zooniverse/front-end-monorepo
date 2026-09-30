import getGeoFeedbackFeatures from './getGeoFeedbackFeatures'
import grader from '@store/feedback/strategies/geo/grader'
import { FEEDBACK_COLORS } from '../RadialFeedback'

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

  it('should color volunteer points by membership in successfulClassifications', function () {
    const features = getGeoFeedbackFeatures(
      [geoAnnotation([[-91.001, 48.001], [-90.9, 48.1]])],
      [radialRule]
    )
    const [, hit, miss] = features
    expect(hit.getStyle().getImage().getStroke().getColor()).to.equal(FEEDBACK_COLORS.success)
    expect(miss.getStyle().getImage().getStroke().getColor()).to.equal(FEEDBACK_COLORS.failure)
  })

  it('should draw volunteer lines and color them by membership in successfulClassifications', function () {
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

  it('should ignore annotations from other task types', function () {
    const drawingAnnotation = { taskType: 'drawing', value: [{ x: 1, y: 2 }] }
    expect(getGeoFeedbackFeatures([drawingAnnotation], [])).to.deep.equal([])
  })

  it('should skip rules with unknown strategies', function () {
    const features = getGeoFeedbackFeatures([], [{ ...radialRule, strategy: 'radial' }])
    expect(features).to.deep.equal([])
  })
})
