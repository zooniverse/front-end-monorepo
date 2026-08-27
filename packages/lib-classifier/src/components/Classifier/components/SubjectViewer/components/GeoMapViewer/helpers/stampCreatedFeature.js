export default function stampCreatedFeature(feature, { activeToolIndex, geoDrawingTask, layerIndex }) {
  if (typeof activeToolIndex === 'number') {
    feature.set('toolIndex', activeToolIndex)
  }

  const stampLayerIndex = typeof layerIndex === 'number'
    ? layerIndex
    : geoDrawingTask?.mapContext?.activeLayerIndex
  if (typeof stampLayerIndex === 'number') {
    feature.set('layer', stampLayerIndex)
  }
}
