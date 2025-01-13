import { types } from 'mobx-state-tree'
import Annotation from '../../../models/Annotation'

const PointsModel = types.model('PointsModel', {
  active: types.array(types.number),
  connected: types.array(types.array(types.number), []),
  all: types.array(types.number),
});

const AnnotationModel = types.model('AnnotationModel', {
  label: types.string,
  threshold: types.number,
  points: PointsModel,
});

const Volumetric = types
  .model('Volumetric', {
    taskType: types.literal('volumetric'),
    value: types.array(AnnotationModel)
  })

const VolumetricAnnotation = types.compose('VolumetricAnnotation', Annotation, Volumetric)
export default VolumetricAnnotation
