import grader from './grader'

// One reducer for every geo strategy: the strategy says how a rule becomes a
// GeoJSON target and which annotation geometry types it grades.
function createGeoReducer (toGeometry, geometryTypes) {
  return function geoReducer (rule, value) {
    const features = Array.from(value?.features || [])
    const target = { geometry: toGeometry(rule), tolerance: rule.tolerance }
    const result = grader.grade(target, features, geometryTypes)
    return Object.assign(rule, {
      success: (result.length > 0),
      successfulClassifications: result
    })
  }
}

export default createGeoReducer
