import { types } from 'mobx-state-tree'
import PointTool from '../PointTool'
import { TemporalPoint } from '../../marks'

const TemporalPointTool = types
  .model('TemporalPoint', {
    marks: types.map(TemporalPoint),
    type: types.literal('temporalPoint')
  })
  .actions((self) => ({
    createMark(mark) {
      const newMark = TemporalPoint.create(
        Object.assign({}, mark, { toolType: self.type })
      )
      self.marks.put(newMark)
      return newMark
    },

    handlePointerMove(event, mark) {
      mark.initialDrag(event)
    },

    handlePointerUp(event, mark) {
      mark.finish()
    }
  }))

export default types.compose('TemporalPointTool', PointTool, TemporalPointTool)
