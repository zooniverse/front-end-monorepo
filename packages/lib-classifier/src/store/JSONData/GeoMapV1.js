import { types } from 'mobx-state-tree'

const GeoMapV1 = types.model('GeoMapV1', {
  _type: "geomap",
  _version: 1,
  info: types.string,
  lat: types.number,
  long: types.number
})

export default GeoMapV1
