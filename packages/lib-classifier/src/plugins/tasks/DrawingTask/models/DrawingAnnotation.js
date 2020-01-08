import { types } from 'mobx-state-tree'
import Annotation from '../../models/Annotation'
import * as markTypes from '@plugins/drawingTools/models/marks'

const markReferenceTypes = Object.values(markTypes).map(markType => types.reference(markType))
const Drawing = types.model('Drawing', {
  value: types.array(types.union(...markReferenceTypes))
})

const DrawingAnnotation = types.compose('DrawingAnnotation', Annotation, Drawing)

export default DrawingAnnotation
