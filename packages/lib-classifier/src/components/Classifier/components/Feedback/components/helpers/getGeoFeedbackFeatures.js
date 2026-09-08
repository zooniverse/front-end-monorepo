import { Feature } from 'ol'
import Point from 'ol/geom/Point'
import Polygon, { circular } from 'ol/geom/Polygon'
import { fromLonLat } from 'ol/proj'
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style'

import { FEEDBACK_COLORS } from '../RadialFeedback'
import boxCornersLonLat from './boxCornersLonLat'

const FILL_ALPHA = '33'

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

function ruleGeometry (rule) {
  if (rule.strategy === 'geoRadial') {
    const geometry = circular([parseFloat(rule.x), parseFloat(rule.y)], parseFloat(rule.tolerance), 64)
    return geometry.transform('EPSG:4326', 'EPSG:3857')
  }
  if (rule.strategy === 'geoBox') {
    const ring = boxCornersLonLat(rule).map(corner => fromLonLat(corner))
    return new Polygon([[...ring, ring[0]]])
  }
  return null
}

function isSuccessfulPoint (coordinates, applicableRules) {
  return applicableRules.some(rule =>
    rule.successfulClassifications?.some(result =>
      result.coordinates?.[0] === coordinates[0] && result.coordinates?.[1] === coordinates[1]
    )
  )
}

function feedbackColor (success) {
  return success ? FEEDBACK_COLORS.success : FEEDBACK_COLORS.failure
}

// Target regions and volunteer points as styled OL features, colored by success.
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
    const points = (annotation.value?.features || [])
      .filter(feature => feature?.geometry?.type === 'Point')
    points.forEach(point => {
      const coordinates = point.geometry.coordinates
      const feature = new Feature(new Point(fromLonLat([...coordinates])))
      feature.setStyle(pointStyle(feedbackColor(isSuccessfulPoint(coordinates, applicableRules))))
      features.push(feature)
    })
  })

  return features
}

export default getGeoFeedbackFeatures
