import { getRoot, types } from 'mobx-state-tree'

const setFunctionMap = {
  single: (value, self) => self.answer = value
}

const setFunctionMapper = type => setFunctionMap[type] || setFunctionMap.single

const Annotation = types
  .model('Annotation', {
    answer: types.frozen,
    taskId: types.identifier(types.string),
  })

  .actions(self => ({
    setValue (value) {
      const task = getRoot(self).tasks.active
      const setFunction = setFunctionMapper(task.type)
      setFunction(value, self)
    }
  }))

export default Annotation
