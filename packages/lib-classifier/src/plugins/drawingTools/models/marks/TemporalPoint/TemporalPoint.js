import { getParentOfType, types } from 'mobx-state-tree'
import { Point as PointComponent } from '@plugins/drawingTools/components'
import { TemporalPointTool } from '@plugins/drawingTools/models/tools'

import Point from '../Point'

const TemporalPointModel = types
  .model('TemporalPointModel', {
    displayTime: types.optional(types.number, 0)
  })
  .views((self) => ({
    get tool() {
      return getParentOfType(self, TemporalPointTool)
    },

    get toolComponent() {
      return PointComponent
    },

    get videoTime() {
      return self.displayTime
    }
  }))
  .actions((self) => {
    function setVideoTime(displayTime) {
      self.displayTime = displayTime
    }

    return {
      setVideoTime
    }
  })

const TemporalPoint = types.compose('TemporalPoint', Point, TemporalPointModel)

export default TemporalPoint
