import { types } from 'mobx-state-tree'
import Annotation from '../../models/Annotation'
import { LineAnnotation, PointAnnotation } from './DrawingToolAnnotations'

const Drawing = types.model('Drawing', {
  value: types.array(
    types.union({
      dispatcher: (snapshot) => {
        switch (snapshot.toolType) {
          case 'line':
            return LineAnnotation
          case 'point':
            return PointAnnotation
          default:
            return null
        }
      }
    })
  )
})

const DrawingAnnotation = types.compose('DrawingAnnotation', Annotation, Drawing)

export default DrawingAnnotation
