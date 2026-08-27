import { types } from 'mobx-state-tree'

const chartCoordinates = types.refinement('requiredArray', types.array(types.number), value => value.length > 0)

const TESSLightCurve = types.model('TESSLightCurve', {
  x: chartCoordinates,
  y: chartCoordinates
})

export default TESSLightCurve
