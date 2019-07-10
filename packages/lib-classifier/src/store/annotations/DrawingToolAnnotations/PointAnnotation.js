import { types } from 'mobx-state-tree'

const PointAnnotation = types.model('PointAnnotation', {
  toolType: types.literal('point'),
  x: types.number,
  y: types.number
})

export default PointAnnotation
