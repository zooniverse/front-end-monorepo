import { types } from 'mobx-state-tree'
import Annotation from '../../../../models/Annotation'

const GeoDrawingFeature = types.model('GeoDrawingFeature', {
  type: types.literal('Feature'),
  geometry: types.model({
    type: types.string,
    coordinates: types.frozen()
  }),
  properties: types.maybe(types.frozen())
})

const GeoDrawingAnnotationValue = types.model('GeoDrawingAnnotationValue', {
  type: types.literal('FeatureCollection'),
  features: types.array(GeoDrawingFeature)
})

const GeoDrawing = types.model('GeoDrawing', {
  taskType: types.literal('geoDrawing'),
  value: types.maybeNull(GeoDrawingAnnotationValue)
})
  .views(self => ({
    get isComplete() {
      return self.value !== null
    }
  }))

const GeoDrawingAnnotation = types.compose('GeoDrawingAnnotation', Annotation, GeoDrawing)

export default GeoDrawingAnnotation
