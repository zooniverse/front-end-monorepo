import asyncStates from '@zooniverse/async-states'
import { types } from 'mobx-state-tree'

const FreehandLineReductions = types
  .model('FreehandLineReductions', {
    reducer: types.literal('machineLearnt'),
    error: types.maybeNull(types.frozen({})),
    loadingState: types.optional(types.enumeration('state', asyncStates.values), asyncStates.initialized),
    reductions: types.array(types.frozen({})),
    subjectId: types.string,
    workflowId: types.string
  })
  .volatile(self => ({
    isUsed: types.boolean,
  }))
  .views(self => {
    return {
      findCurrentTaskMarks({ stepKey, tasks, frame }) {
        if (stepKey === undefined || tasks === undefined || frame === undefined) {
          return
        }

        let caesarMarks = [];

        self.reductions.forEach(reduction => {
          let { data } = reduction.data   // Caesar expects data attribute to be an object
          data.forEach(datum => {
            let task = tasks[datum.taskIndex]
            let tool = task.tools[datum.toolIndex]

            if (datum.frame === frame
              && datum.stepKey === stepKey
              && datum.taskKey === task.taskKey
              && datum.taskType === task.type
              && datum.toolType === tool.type
            ) {
              caesarMarks.push(datum)
            }
          })
        })

        return caesarMarks
      }
    }
  })

  .actions(self => {
    return {
      afterCreate: () => {
        self.isUsed = false
      },

      setIsUsed() {
        self.isUsed = true;
      }
    }
  })

export default FreehandLineReductions
