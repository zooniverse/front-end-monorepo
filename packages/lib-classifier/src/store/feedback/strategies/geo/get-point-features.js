// The geoDrawing annotation value is a GeoJSON FeatureCollection, not an array of marks.
function getPointFeatures (value) {
  const features = Array.from(value?.features || [])
  return features.filter(feature => feature?.geometry?.type === 'Point')
}

export default getPointFeatures
