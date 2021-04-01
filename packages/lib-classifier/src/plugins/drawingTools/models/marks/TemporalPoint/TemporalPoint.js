import {
  addDisposer,
  getRoot,
  getParentOfType,
  isValidReference,
  types
} from 'mobx-state-tree'
import { TemporalPoint as TemporalPointComponent } from '../../../components'
import { TemporalPointTool } from '@plugins/drawingTools/models/tools'

import Mark from '../Mark'
import Point from '../Point'

const TemporalPointModel = types
  .model('TemporalPointModel', {
    t: types.optional(types.number, 0),
  })
  .views((self) => ({
    get tool() {
      return getParentOfType(self, TemporalPointTool)
    },

    get toolComponent() {
      return TemporalPointComponent
    }
  }))


const TemporalPoint = types.compose('TemporalPoint', Point, TemporalPointModel)

export default TemporalPoint
