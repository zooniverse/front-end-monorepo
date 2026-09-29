import createGeoRule from '../create-rule'
import geometry from './geometry'
import grader from '../grader'
import createGeoReducer from '../reducer'

export default {
  createRule: createGeoRule(({ height, theta, width, x, y }) => ({ height, theta: theta || '0', width, x, y })),
  geometry,
  id: 'geoBox',
  load: grader.load,
  reducer: createGeoReducer(geometry, ['Point']),
  title: 'Geo Box'
}
