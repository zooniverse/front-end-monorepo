import { isStateTreeNode } from 'mobx-state-tree'
import * as features from '@plugins/tasks/experimental/geoDrawing/features/models'

function toMSTFeature(olFeature) {
  const geometry = olFeature?.getGeometry?.()
  const geometryType = geometry?.getType?.()
  const GeoFeatureModel = geometryType ? features[geometryType] : undefined
  if (!GeoFeatureModel?.create) return null
  const { geometry: _olGeometry, ...properties } = olFeature.getProperties?.() || {}
  return GeoFeatureModel.create({
    geometry,
    properties
  })
}

/**
 * Returns MST feature if already MST; otherwise tries to construct from OL feature.
 */
function asMSTFeature(feature) {
  if (!feature) return null
  if (isStateTreeNode(feature)) return feature
  return toMSTFeature(feature)
}

export default asMSTFeature
