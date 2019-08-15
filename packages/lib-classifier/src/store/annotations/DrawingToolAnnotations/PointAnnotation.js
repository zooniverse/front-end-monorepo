import { types } from 'mobx-state-tree'
import BaseAnnotation from './BaseAnnotation'

export const Point = types.model('Point', {
  toolType: types.literal('point'),
  x: types.number,
  y: types.number
})

const PointAnnotation = types.compose('PointAnnotation', BaseAnnotation, Point)

export default PointAnnotation
