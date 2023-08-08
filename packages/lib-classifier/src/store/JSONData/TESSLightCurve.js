import { types } from 'mobx-state-tree'

const chartCoordinates = types.refinement('requiredArray', types.array(types.number), value => value.length > 0)

export default types.model('TESSLightCurve', {
  x: chartCoordinates,
  y: chartCoordinates
})
