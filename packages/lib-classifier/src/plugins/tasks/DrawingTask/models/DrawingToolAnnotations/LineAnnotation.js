import { types } from 'mobx-state-tree'

const LineAnnotation = types.model('LineAnnotation', {
  toolType: types.literal('line'),
  x1: types.number,
  x2: types.number,
  y1: types.number,
  y2: types.number
})

export default LineAnnotation
