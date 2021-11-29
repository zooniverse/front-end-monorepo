import { getParentOfType, types } from 'mobx-state-tree'
import { RotateRectangle as RotateRectangleComponent } from '@plugins/drawingTools/components'
import { TemporalRotateRectangleTool } from '@plugins/drawingTools/models/tools'
import formatTimeStamp from '@helpers/formatTimeStamp'

import RotateRectangle from '../RotateRectangle'

const TemporalRotateRectangleModel = types
  .model('TemporalRotateRectangleModel', {
    displayTime: types.optional(types.number, 0),
    displayTimeStamp: types.optional(types.string, '')
  })
  .views((self) => ({
    get tool() {
      return getParentOfType(self, TemporalRotateRectangleTool)
    },

    get toolComponent() {
      return RotateRectangleComponent
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

const TemporalRotateRectangle = types.compose(
  'TemporalRotateRectangle',
  RotateRectangle,
  TemporalRotateRectangleModel
)

export default TemporalRotateRectangle
