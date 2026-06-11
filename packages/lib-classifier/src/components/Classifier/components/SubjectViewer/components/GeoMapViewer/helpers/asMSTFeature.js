import { isStateTreeNode } from 'mobx-state-tree'
import * as features from '@plugins/tasks/experimental/geoDrawing/features/models'

const MODEL_KEY_BY_GEOMETRY_TYPE = {
  Point: 'Point',
  LineString: 'SegmentedLine'
}

function toMSTFeature(olFeature) {
  const geometry = olFeature?.getGeometry?.()
  const geometryType = geometry?.getType?.()
  const GeoFeatureModel = geometryType ? features[MODEL_KEY_BY_GEOMETRY_TYPE[geometryType]] : undefined
  if (!GeoFeatureModel?.create) return null
  const { geometry: _olGeometry, ...properties } = olFeature.getProperties?.() || {}
  return GeoFeatureModel.create({
    geometry,
    properties
  })
}

function asMSTFeature(feature) {
  if (!feature) return null
  if (isStateTreeNode(feature)) return feature
  return toMSTFeature(feature)
}

export default asMSTFeature
