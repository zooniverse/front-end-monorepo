import { isStateTreeNode } from 'mobx-state-tree'
import * as features from '@plugins/tasks/experimental/geoDrawing/features/models'

function toMSTFeature(olFeature) {
  const geometry = olFeature?.getGeometry?.()
  const geometryType = geometry?.getType?.()
  const GeoFeatureModel = geometryType ? features[geometryType] : undefined
  if (!GeoFeatureModel?.create) return null
  return GeoFeatureModel.create({
    geometry,
    properties: olFeature.getProperties?.()
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
