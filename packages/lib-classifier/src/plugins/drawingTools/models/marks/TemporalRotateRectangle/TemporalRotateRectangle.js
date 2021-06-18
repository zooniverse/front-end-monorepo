import { getParentOfType, types } from 'mobx-state-tree'
import { RotateRectangle as RotateRectangleComponent } from '@plugins/drawingTools/components'
import { TemporalRotateRectangleTool } from '@plugins/drawingTools/models/tools'

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
  .actions((self) => {
    function setVideoTime(displayTime, duration) {
      self.displayTime = displayTime

      // creates 'ss:ms' timestamp
      const currentVideoTime = displayTime * duration
      const pad = (string, digits) =>
        ('0'.repeat(digits - 1) + string).slice(-digits)

      const date = new Date(currentVideoTime * 1000)
      const mm = pad(date.getUTCMinutes(), 2)
      const ss = pad(date.getUTCSeconds(), 2)
      const ms = pad(date.getUTCMilliseconds(), 3)
      if (mm > 0) {
        self.displayTimeStamp = `${mm}:${ss}:${ms}`
      }
      self.displayTimeStamp = `${ss}:${ms}`
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
