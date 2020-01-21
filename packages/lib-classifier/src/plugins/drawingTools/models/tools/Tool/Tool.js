import { types } from 'mobx-state-tree'
import { Mark } from '../../marks'

const Tool = types.model('Tool', {
  color: types.optional(types.string, ''),
  label: types.optional(types.string, ''),
  marks: types.map(Mark),
  max: types.optional(types.union(types.string, types.number), Infinity),
  min: types.optional(types.union(types.string, types.number), 0),
  type: types.literal('default')
})
  .views(self => ({
    get disabled () {
      return self.marks.size >= self.max
    },

    get isComplete () {
      return (self.marks.size >= self.min)
    }
  }))
  .actions(self => {
    function createMark (mark) {
      const newMark = Mark.create(Object.assign({}, mark, { toolType: self.type }))
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

export default Tool
