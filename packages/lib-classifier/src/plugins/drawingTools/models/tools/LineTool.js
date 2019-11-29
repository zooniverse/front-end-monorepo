import { types } from 'mobx-state-tree'
import { Line } from '../marks'

const LineTool = types.model('Line', {
  color: types.optional(types.string, ''),
  label: types.optional(types.string, ''),
  marks: types.map(Line),
  max: types.maybe(types.union(types.string, types.number), ''),
  min: types.maybe(types.union(types.string, types.number), ''),
  type: types.literal('line')
})
  .views(self => ({
    get isComplete () {
      return (self.marks.size >= self.min && self.marks.size <= self.max)
    }
  }))
  .actions(self => {
    function createMark (mark) {
      const newMark = Line.create(mark)
      self.marks.put(newMark)
      return newMark
    }

    function deleteMark (mark) {
      self.marks.delete(mark.id)
    }

    return {
      createMark,
      deleteMark
    }
  })

export default LineTool
