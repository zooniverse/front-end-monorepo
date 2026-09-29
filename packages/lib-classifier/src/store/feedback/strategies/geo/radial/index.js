import createGeoRule from '../create-rule'
import geometry from './geometry'
import grader from '../grader'
import createGeoReducer from '../reducer'

export default {
  createRule: createGeoRule(({ x, y }) => ({ x, y })),
  geometry,
  id: 'geoRadial',
  load: grader.load,
  reducer: createGeoReducer(geometry, ['Point']),
  title: 'Geo Radial'
}
