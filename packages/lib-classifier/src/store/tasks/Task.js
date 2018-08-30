import { types } from 'mobx-state-tree'

const Task = types.model('Task', {
  taskKey: types.identifier
})

export default Task