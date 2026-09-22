import { Feature } from 'ol'
import GeoJSON from 'ol/format/GeoJSON'
import LineString from 'ol/geom/LineString'
import Point from 'ol/geom/Point'
import { fromLonLat } from 'ol/proj'
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style'

import grader from '@store/feedback/strategies/geo/grader'
import strategies from '@store/feedback/strategies'
import { FEEDBACK_COLORS } from '../RadialFeedback'

const FILL_ALPHA = '33'
const format = new GeoJSON()
const READ_OPTIONS = { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' }

function ruleStyle (color) {
  return new Style({
    stroke: new Stroke({ color, width: 3 }),
    fill: new Fill({ color: `${color}${FILL_ALPHA}` })
  })
}

function pointStyle (color) {
  return new Style({
    image: new CircleStyle({
      radius: 7,
      stroke: new Stroke({ color, width: 3 }),
      fill: new Fill({ color: `${color}${FILL_ALPHA}` })
    })
  })
}

function lineStyle (color) {
  return new Style({ stroke: new Stroke({ color, width: 4 }) })
}

// The rule's target grown by its tolerance, as drawn on the map.
function ruleGeometry (rule) {
  const toGeometry = strategies[rule.strategy]?.geometry
  if (!toGeometry || !grader.isLoaded()) return null
  const geometry = grader.targetGeometry({ geometry: toGeometry(rule), tolerance: rule.tolerance })
  return format.readGeometry(geometry, READ_OPTIONS)
}

function isSuccessful (geometry, applicableRules) {
  const key = JSON.stringify(geometry.coordinates)
  return applicableRules.some(rule =>
    rule.successfulClassifications?.some(result =>
      result.type === geometry.type && JSON.stringify(result.coordinates) === key
    )
  )
}

function feedbackColor (success) {
  return success ? FEEDBACK_COLORS.success : FEEDBACK_COLORS.failure
}

function volunteerFeature (geometry, color) {
  if (geometry.type === 'Point') {
    const feature = new Feature(new Point(fromLonLat([...geometry.coordinates])))
    feature.setStyle(pointStyle(color))
    return feature
  }
  if (geometry.type === 'LineString') {
    const feature = new Feature(new LineString(geometry.coordinates.map(coordinates => fromLonLat([...coordinates]))))
    feature.setStyle(lineStyle(color))
    return feature
  }
  return null
}

// Target regions and volunteer marks as styled OL features, colored by success.
function getGeoFeedbackFeatures (annotations = [], applicableRules = []) {
  const features = []

  applicableRules.forEach(rule => {
    const geometry = ruleGeometry(rule)
    if (!geometry) return
    const feature = new Feature(geometry)
    feature.setStyle(ruleStyle(feedbackColor(rule.success)))
    features.push(feature)
  })

  annotations.forEach(annotation => {
    if (annotation.taskType !== 'geoDrawing') return
    const geometries = (annotation.value?.features || [])
      .map(feature => feature?.geometry)
      .filter(Boolean)
    geometries.forEach(geometry => {
      const feature = volunteerFeature(geometry, feedbackColor(isSuccessful(geometry, applicableRules)))
      if (feature) features.push(feature)
    })
  })

  return features
}

export default getGeoFeedbackFeatures
