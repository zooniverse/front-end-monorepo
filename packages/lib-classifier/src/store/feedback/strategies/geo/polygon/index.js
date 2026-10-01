import createGeoRule from '../create-rule'
import geometry from './geometry'
import grader from '../grader'
import parseCoordinates from '../parse-coordinates'
import createGeoReducer from '../reducer'

export default {
  createRule: createGeoRule(({ coordinates }) => ({ coordinates: parseCoordinates(coordinates, 3) })),
  geometry,
  id: 'geoPolygon',
  load: grader.load,
  reducer: createGeoReducer(geometry, ['Point']),
  title: 'Geo Polygon'
}
