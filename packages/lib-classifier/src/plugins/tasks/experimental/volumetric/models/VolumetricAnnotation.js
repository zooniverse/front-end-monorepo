import { types } from 'mobx-state-tree'
import Annotation from '../../../models/Annotation'

const CoordinateModel = types.model('CoordinateModel', {
  x: types.number,
  y: types.number,
  z: types.number
})

const PointsModel = types.model('PointsModel', {
  active: types.array(CoordinateModel),
  connected: types.array(types.array(CoordinateModel), [])
})

const AnnotationModel = types.model('AnnotationModel', {
  label: types.string,
  threshold: types.number,
  points: PointsModel,
})

const Volumetric = types
  .model('Volumetric', {
    taskType: types.literal('volumetric'),
    value: types.array(AnnotationModel)
  })

const VolumetricAnnotation = types.compose('VolumetricAnnotation', Annotation, Volumetric)
export default VolumetricAnnotation
