import { types } from 'mobx-state-tree'

const PointAnnotation = types.model('PointAnnotation', {
  tool: types.number,
  toolType: types.string,
  x: types.number,
  y: types.number
})

export default PointAnnotation
