export default function isPointFeature(feature) {
  return feature?.getGeometry?.()?.getType?.() === 'Point'
}
