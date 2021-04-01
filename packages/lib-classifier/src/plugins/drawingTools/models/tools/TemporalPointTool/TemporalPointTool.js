import { types } from 'mobx-state-tree'
import Tool from '../Tool'
import { TemporalPoint } from '../../marks'

const TemporalPointTool = types.model('TemporalPoint', {
  marks: types.map(TemporalPoint),
  size: types.optional(types.enumeration(['large', 'small']), 'large'),
  type: types.literal('temporal-point')
})
  .actions(self => {
    function createMark (mark) {
      const newMark = TemporalPoint.create(Object.assign({}, mark, { toolType: self.type }))
      self.marks.put(newMark)
      return newMark
    }

    return {
      createMark
    }
  })

export default types.compose('TemporalPointTool', Tool, TemporalPointTool)
