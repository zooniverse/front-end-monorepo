import { types } from 'mobx-state-tree'
import Annotation from './Annotation'
import { PointAnnotation } from './DrawingToolAnnotations'

const Drawing = types.model('Drawing', {
  value: types.array(
    types.union({
      dispatcher: (snapshot) => {
        if (snapshot.toolType === 'point') return PointAnnotation
        return undefined
      }
    })
  )
})

const DrawingAnnotation = types.compose('DrawingAnnotation', Annotation, Drawing)

export default DrawingAnnotation
