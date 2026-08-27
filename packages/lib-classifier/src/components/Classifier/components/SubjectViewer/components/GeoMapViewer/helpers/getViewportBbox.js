import { transformExtent } from 'ol/proj'

import { GEOJSON_READ_OPTIONS } from './constants'

export default function getViewportBbox(map) {
  const size = map?.getSize?.()
  if (!size) return null
  const extent = map.getView().calculateExtent(size)
  return transformExtent(extent, GEOJSON_READ_OPTIONS.featureProjection, GEOJSON_READ_OPTIONS.dataProjection)
}
