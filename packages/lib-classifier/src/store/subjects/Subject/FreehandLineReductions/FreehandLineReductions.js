import asyncStates from '@zooniverse/async-states'
import { types } from 'mobx-state-tree'

const FreehandLineReductions = types
  .model('FreehandLineReductions', {
    reducer: types.literal('machine-learnt'),
    error: types.maybeNull(types.frozen({})),
    loadingState: types.optional(types.enumeration('state', asyncStates.values), asyncStates.initialized),
    reductions: types.array(types.frozen({})),
    subjectId: types.string,
    workflowId: types.string
  })

  .views(self => {
    return {
      findCurrentTaskMark({ stepKey, tasks, frame }) {
        if (stepKey === undefined || tasks === undefined || frame === undefined) {
          return
        }

        let caesarMark;

        self.reductions.forEach(reduction => {
          let { data } = reduction
          let task = tasks[data.taskIndex]
          let tool = task.tools[data.toolIndex]

          if (data.frame === frame
            && data.stepKey === stepKey
            && data.taskKey === task.taskKey
            && data.taskType === task.type
            && data.toolType === tool.type
          ) {
            caesarMark = data
          }
        })

        return caesarMark
      }
    }
  })

  .actions(self => {
    return {}
  })

export default FreehandLineReductions
