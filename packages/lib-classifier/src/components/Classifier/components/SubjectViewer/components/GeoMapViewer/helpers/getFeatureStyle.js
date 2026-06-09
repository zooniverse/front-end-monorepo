import asMSTFeature from './asMSTFeature'

export default function getFeatureStyle({ feature, geoDrawingTask, isSelected = false, resolution }) {
  const mstFeature = asMSTFeature(feature)
  if (!mstFeature) return null
  return mstFeature.getStyles({ feature, geoDrawingTask, isSelected, resolution })
}
