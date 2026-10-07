// The only importer of @turf/*: reached through grader.load() so the ~250 KB of
// turf + jsts lands in its own chunk and only loads for geo feedback subjects.
import { booleanWithin } from '@turf/boolean-within'
import { buffer } from '@turf/buffer'
import { feature } from '@turf/helpers'

const STEPS = 16

// The target grown by the rule's tolerance, as a GeoJSON Polygon feature.
export function corridor (rule) {
  return buffer(feature(rule.geometry), parseFloat(rule.tolerance), { units: 'meters', steps: STEPS })
}

export { booleanWithin }
