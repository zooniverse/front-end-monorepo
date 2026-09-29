import createGeoRule from '../create-rule'
import geometry from './geometry'
import grader from '../grader'
import parseLines from '../parse-lines'
import createGeoReducer from '../reducer'

export default {
  createRule: createGeoRule(({ coordinates }) => ({ coordinates: parseLines(coordinates) })),
  geometry,
  id: 'geoLine',
  load: grader.load,
  reducer: createGeoReducer(geometry, ['LineString']),
  title: 'Geo Line'
}
