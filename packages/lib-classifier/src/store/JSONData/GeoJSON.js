import { types } from 'mobx-state-tree'

const Geometry = types.model('GeoJSONGeometry', {
	type: types.enumeration('Type', ['Point', 'LineString', 'LinearRing', 'Polygon', 'MultiPoint', 'MultiLineString', 'MultiPolygon', 'GeometryCollection', 'Circle']),
	// Allow any valid GeoJSON coordinates structure (Point, LineString, Polygon, etc.).
	coordinates: types.frozen()
})

const Feature = types.model('GeoJSONFeature', {
	type: types.literal('Feature'),
	geometry: Geometry,
	properties: types.maybe(types.frozen())
})

export default types.model('GeoJSON', {
	type: types.literal('FeatureCollection'),
	features: types.array(Feature)
})
