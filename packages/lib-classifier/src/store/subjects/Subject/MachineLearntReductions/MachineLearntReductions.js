import asyncStates from '@zooniverse/async-states'
import { types } from 'mobx-state-tree'

const MachineLearntReductions = types
  .model('MachineLearntReductions', {
    reducer: types.literal('machineLearnt'),
    error: types.maybeNull(types.frozen({})),
    loadingState: types.optional(types.enumeration('state', asyncStates.values), asyncStates.initialized),
    reductions: types.array(types.frozen({})),
    subjectId: types.string,
    workflowId: types.string
  })
  .views(self => {
    return {
      findCurrentTaskMarks({ stepKey }) {
        if (stepKey === undefined) {
          return
        }

        let caesarMarks = [];

        self.reductions.forEach(reduction => {
          let { data } = reduction.data   // Caesar expects data attribute to be an object

          data.forEach(datum => {
            if (datum.stepKey === stepKey) {
              caesarMarks.push(datum)
            }
          })
        })

        return caesarMarks
      }
    }
  })

export default MachineLearntReductions
