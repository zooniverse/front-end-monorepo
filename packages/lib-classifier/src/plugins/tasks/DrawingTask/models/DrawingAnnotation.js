import { types } from 'mobx-state-tree'
import Annotation from '../../models/Annotation'
import * as markTypes from './markings'

const Drawing = types.model('Drawing', {
  value: types.array(
    types.union(...Object.values(markTypes))
  )
})

const DrawingAnnotation = types.compose('DrawingAnnotation', Annotation, Drawing)

export default DrawingAnnotation
