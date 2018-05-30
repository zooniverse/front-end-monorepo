import { getEnv, types } from 'mobx-state-tree'
import Subjects from './Subjects'
import Workflows from './Workflows'

const RootStore = types
  .model('RootStore', {
    project: types.frozen,
    subjects: types.optional(Subjects, Subjects.create()),
    workflows: types.optional(Workflows, Workflows.create())
  })

  .views(self => ({
    get client () {
      return getEnv(self).client
    }
  }))

export default RootStore
