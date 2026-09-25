let turf = null
let loading = null

function load () {
  if (!loading) {
    loading = import('./turf').then(module => {
      turf = module
      return module
    })
  }
  return loading
}

function isLoaded () {
  return turf !== null
}

function hasFiniteCoordinates (coordinates) {
  if (Array.isArray(coordinates)) {
    return coordinates.length > 0 && coordinates.every(hasFiniteCoordinates)
  }
  return Number.isFinite(coordinates)
}

function firstLon (coordinates) {
  return Array.isArray(coordinates[0]) ? firstLon(coordinates[0]) : coordinates[0]
}

// Shift longitudes onto the same world copy as the target so a corridor across
// the antimeridian stays one continuous shape instead of wrapping to [-180, 180].
function unwrap (coordinates, referenceLon) {
  if (Array.isArray(coordinates[0])) {
    return coordinates.map(child => unwrap(child, referenceLon))
  }
  const [lon, ...rest] = coordinates
  const delta = lon - referenceLon
  const shift = delta > 180 ? -360 : delta < -180 ? 360 : 0
  return [lon + shift, ...rest]
}

function unwrapGeometry (geometry, referenceLon) {
  return { ...geometry, coordinates: unwrap(geometry.coordinates, referenceLon) }
}

function targetGeometry (rule) {
  const { geometry } = turf.corridor(rule)
  return unwrapGeometry(geometry, firstLon(rule.geometry.coordinates))
}

// Features of the accepted geometry types that lie within the target's corridor,
// in the shape FeedbackStore persists into classification metadata.
function grade (rule, features = [], geometryTypes = ['Point']) {
  if (!turf) throw new Error('Feedback: geo grader used before load() resolved')
  const referenceLon = firstLon(rule.geometry.coordinates)
  const corridor = { type: 'Feature', properties: {}, geometry: targetGeometry(rule) }
  return features
    .filter(feature => geometryTypes.includes(feature?.geometry?.type) && hasFiniteCoordinates(feature.geometry.coordinates))
    .filter(feature => turf.booleanWithin(unwrapGeometry(feature.geometry, referenceLon), corridor))
    .map(feature => ({
      coordinates: JSON.parse(JSON.stringify(feature.geometry.coordinates)),
      type: feature.geometry.type
    }))
}

export default { grade, isLoaded, load, targetGeometry }
