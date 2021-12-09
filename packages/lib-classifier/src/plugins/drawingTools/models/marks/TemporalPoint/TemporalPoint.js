import { getParentOfType, types } from 'mobx-state-tree'
import { Point as PointComponent } from '@plugins/drawingTools/components'
import { TemporalPointTool } from '@plugins/drawingTools/models/tools'
import formatTimeStamp from '@helpers/formatTimeStamp'

import Point from '../Point'

const TemporalPointModel = types
  .model('TemporalPointModel', {
    displayTime: types.optional(types.number, 0),
    displayTimeStamp: types.optional(types.string, '')
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
  .actions((self) => ({
    setVideoTime(displayTime, duration) {
      self.displayTime = displayTime
      self.displayTimeStamp = formatTimeStamp(displayTime, duration)
    }
  }))

const TemporalPoint = types.compose('TemporalPoint', Point, TemporalPointModel)

export default TemporalPoint
