import { types } from 'mobx-state-tree'
import Annotation from './Annotation'
import { LineAnnotation, PointAnnotation } from './DrawingToolAnnotations'

const Drawing = types.model('Drawing', {
  value: types.array(Object.assign(
    types.frozen({
      frame: types.number,
      toolIndex: types.number
    }),
    types.union({
      dispatcher: (snapshot) => {
        switch (snapshot.toolType) {
          case 'line':
            return LineAnnotation
          case 'point':
            return PointAnnotation
        }
      }
    })
  ))
})

const DrawingAnnotation = types.compose('DrawingAnnotation', Annotation, Drawing)

export default DrawingAnnotation
