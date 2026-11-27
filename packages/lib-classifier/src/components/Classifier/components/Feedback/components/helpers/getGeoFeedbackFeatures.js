import { Feature } from 'ol'
import GeoJSON from 'ol/format/GeoJSON'
import LineString from 'ol/geom/LineString'
import Point from 'ol/geom/Point'
import { fromLonLat } from 'ol/proj'
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style'

import FEEDBACK_COLORS from '@store/feedback/helpers/feedback-colors'
import grader from '@store/feedback/strategies/geo/grader'
import strategies from '@store/feedback/strategies'

const FILL_ALPHA = '33'
const RULE_LINE_DASH = [8, 6]
const format = new GeoJSON()
const READ_OPTIONS = { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' }

function ruleStyle (color) {
  return new Style({
    stroke: new Stroke({ color, width: 3, lineDash: RULE_LINE_DASH }),
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

function toolColor (feature, geoDrawingTask) {
  const toolIndex = geoDrawingTask?.getToolIndexForFeature?.(feature)
  return geoDrawingTask?.tools?.[toolIndex]?.color
}

// Target regions colored by success; volunteer marks in the color of the tool that made them.
function getGeoFeedbackFeatures (annotations = [], applicableRules = [], geoDrawingTask) {
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
    const marks = (annotation.value?.features || []).filter(mark => mark?.geometry)
    marks.forEach(mark => {
      const color = toolColor(mark, geoDrawingTask) || feedbackColor(isSuccessful(mark.geometry, applicableRules))
      const feature = volunteerFeature(mark.geometry, color)
      if (feature) features.push(feature)
    })
  })

  return features
}

export default getGeoFeedbackFeatures
