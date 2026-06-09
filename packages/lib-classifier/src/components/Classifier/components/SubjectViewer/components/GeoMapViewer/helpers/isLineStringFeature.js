export default function isLineStringFeature(feature) {
  return feature?.getGeometry?.()?.getType?.() === 'LineString'
}
