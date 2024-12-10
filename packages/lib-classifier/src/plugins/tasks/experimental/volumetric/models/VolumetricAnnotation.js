import { types } from 'mobx-state-tree'
import Annotation from '../../../models/Annotation'

const Volumetric = types
  .model('Volumetric', {
    taskType: types.literal('volumetric'),
    value: types.optional(types.string, ''),
  })

const VolumetricAnnotation = types.compose('VolumetricAnnotation', Annotation, Volumetric)
export default VolumetricAnnotation
