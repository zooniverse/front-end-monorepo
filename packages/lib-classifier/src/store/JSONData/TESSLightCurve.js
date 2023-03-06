import { types } from 'mobx-state-tree'

const TESSLightCurve = types.model('TESSLightCurve', {
  x: types.array(types.number),
  y: types.array(types.number)
})

export default types.frozen(TESSLightCurve)
