import GeoJSON from 'ol/format/GeoJSON'
import { transformExtent } from 'ol/proj'

import { GEOJSON_READ_OPTIONS, ZOOM_ANIMATION_DURATION_MS } from './constants'
import constrainMapToExtent from './extentConstraint'
import { fitViewToExtent, selectFirstFeature } from './mapSelection'

function getSubjectExtent(data) {
  if (!Array.isArray(data.bbox) || data.bbox.length !== 4) return null
  return transformExtent(data.bbox, GEOJSON_READ_OPTIONS.dataProjection, GEOJSON_READ_OPTIONS.featureProjection)
}

export default function loadGeoJSON({ map, source, select, measure, data, autoSelect = true }) {
  if (!map || !source) return
  measure?.clear?.()
  source.clear()
  if (!data) return

  const format = new GeoJSON()
  const features = format.readFeatures(data, GEOJSON_READ_OPTIONS)
  source.addFeatures(features)
  const extent = getSubjectExtent(data) || (features.length ? source.getExtent() : null)
  if (!extent) return
  constrainMapToExtent(map, extent)
  fitViewToExtent(map, extent, ZOOM_ANIMATION_DURATION_MS)
  if (autoSelect) selectFirstFeature(select, features)
}
