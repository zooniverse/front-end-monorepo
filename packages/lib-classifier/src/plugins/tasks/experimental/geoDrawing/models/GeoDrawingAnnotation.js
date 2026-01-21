import { types } from 'mobx-state-tree'
import Annotation from '../../../models/Annotation'

const GeoDrawing = types.model('GeoDrawing', {
  taskType: types.literal('geoDrawing'),
  value: types.optional(types.array(types.frozen()), [])
})
  .views(self => ({
    get isComplete() {
      return self.value.length > 0
    }
  }))

const GeoDrawingAnnotation = types.compose('GeoDrawingAnnotation', Annotation, GeoDrawing)

export default GeoDrawingAnnotation
