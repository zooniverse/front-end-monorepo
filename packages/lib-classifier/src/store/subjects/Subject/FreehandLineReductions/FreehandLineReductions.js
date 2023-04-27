import asyncStates from '@zooniverse/async-states'
import { flow, getEnv, types } from 'mobx-state-tree'

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
      consensusLines(frame) {
        let pathX = []
        let pathY = []

        self.reductions.forEach(reduction => {
			    reduction.data.points.forEach(xy => {
            pathX.push(xy[0])
            pathY.push(xy[1])
          })
        })

        return {
          pathX: pathX,
          pathY: pathY
        }
      }
    }
  })

  .actions(self => {
  return {}
})

export default FreehandLineReductions
