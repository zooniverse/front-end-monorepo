import GeoJSON from 'ol/format/GeoJSON'

import { GEOJSON_READ_OPTIONS, ZOOM_ANIMATION_DURATION_MS } from './constants'
import { fitViewToFeatures, selectFirstFeature } from './mapSelection'

export default function loadGeoJSON({ map, source, select, measure, data }) {
  if (!map || !source) return
  measure?.clear?.()
  source.clear()
  if (!data) return

  const format = new GeoJSON()
  const features = format.readFeatures(data, GEOJSON_READ_OPTIONS)
  source.addFeatures(features)
  if (source.getFeatures().length) {
    fitViewToFeatures(map, source, ZOOM_ANIMATION_DURATION_MS)
    selectFirstFeature(select, features)
  }
}
