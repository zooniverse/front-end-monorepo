import { isStateTreeNode } from 'mobx-state-tree'
import * as features from '@plugins/tasks/experimental/geoDrawing/features/models'

function getFeatureStyle({
  feature,
  geoDrawingTask,
  isSelected = false,
  resolution
}) {
  // If this is already an MST feature node with styling, return its styles
  if (isStateTreeNode(feature)) {
    return feature.getStyles({
      feature,
      geoDrawingTask,
      isSelected,
      resolution
    })
  }

  // Otherwise, attempt to build the appropriate MST feature model from the OL feature
  const geometry = feature?.getGeometry?.()
  const geometryType = geometry?.getType?.()
  const GeoFeatureModel = geometryType ? features[geometryType] : undefined

  if (!GeoFeatureModel?.create) return null

  const newFeature = GeoFeatureModel.create({
    geometry: geometry,
    properties: feature.getProperties?.()
  })

  return newFeature.getStyles({
    feature,
    geoDrawingTask,
    isSelected,
    resolution
  })
}

export default getFeatureStyle
