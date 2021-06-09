import { getParentOfType, types } from 'mobx-state-tree'
import { RotateRectangle as RotateRectangleComponent } from '@plugins/drawingTools/components'
import { TemporalRotateRectangleTool } from '@plugins/drawingTools/models/tools'

import RotateRectangle from '../RotateRectangle'

const TemporalRotateRectangleModel = types
  .model('TemporalRotateRectangleModel', {
    displayTime: types.optional(types.number, 0)
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
  .actions((self) => {
    function setVideoTime(displayTime) {
      self.displayTime = displayTime
    }

    return {
      setVideoTime
    }
  })

const TemporalRotateRectangle = types.compose(
  'TemporalRotateRectangle',
  RotateRectangle,
  TemporalRotateRectangleModel
)

export default TemporalRotateRectangle
