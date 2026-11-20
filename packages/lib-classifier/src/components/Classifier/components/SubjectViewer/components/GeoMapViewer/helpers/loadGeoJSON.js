import GeoJSON from 'ol/format/GeoJSON'
import { transformExtent } from 'ol/proj'

import { GEOJSON_READ_OPTIONS, ZOOM_ANIMATION_DURATION_MS } from './constants'
import constrainMapToExtent from './extentConstraint'
import { fitViewToExtent, selectFirstFeature } from './mapSelection'

function getSubjectExtent(data) {
  if (!Array.isArray(data.bbox) || data.bbox.length !== 4) return null
  return transformExtent(data.bbox, GEOJSON_READ_OPTIONS.dataProjection, GEOJSON_READ_OPTIONS.featureProjection)
}

// Returns the subject bbox extent the view is constrained to, or null when the subject has none.
export default function loadGeoJSON({ map, source, select, measure, data, autoSelect = true }) {
  if (!map || !source) return null
  measure?.clear?.()
  source.clear()
  if (!data) return null

  const format = new GeoJSON()
  const features = format.readFeatures(data, GEOJSON_READ_OPTIONS)
  source.addFeatures(features)
  const subjectExtent = getSubjectExtent(data)
  const viewExtent = subjectExtent || (features.length ? source.getExtent() : null)
  if (!viewExtent) return null
  if (subjectExtent) constrainMapToExtent(map, subjectExtent)
  fitViewToExtent(map, viewExtent, ZOOM_ANIMATION_DURATION_MS)
  if (autoSelect) selectFirstFeature(select, features)
  return subjectExtent
}
