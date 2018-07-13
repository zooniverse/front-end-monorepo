import { types } from 'mobx-state-tree'

const Task = types
  .model('Task', {
    answers: types.frozen,
    help: types.maybe(types.string),
    id: types.identifier(types.string),
    question: types.maybe(types.string),
    type: types.string
  })

export default Task
