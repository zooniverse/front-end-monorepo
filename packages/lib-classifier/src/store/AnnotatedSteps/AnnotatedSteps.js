import cuid from 'cuid'
import { types } from 'mobx-state-tree'
import { UndoManager } from 'mst-middlewares'

import AnnotatedStep from './AnnotatedStep'

let undoManager = {}
function setUndoManager(targetStore) {
    undoManager = targetStore.history
}

const AnnotatedSteps = types.model('AnnotatedSteps', {
  steps: types.map(AnnotatedStep),
  history: types.optional(UndoManager, {})
})
.views(self => ({
  get canUndo() {
    return self.history.canUndo
  },

  get latest() {
    const stepsArray = Array.from(self.steps.values())
    const { length } = stepsArray
    return stepsArray[length - 1]
  }
}))
.actions(self => {
  setUndoManager(self)

  function back() {
    const { history } = self
    if (history.canUndo) {
      history.undo()
    }
  }

  function createStep({ step, annotations }) {
    const { steps } = self
    const historyStep = {
      id: cuid(),
      step,
      annotations
    }
    steps.put(historyStep)
  }

  function next({ step, annotations }) {
    const { history } = self
    if (history.canRedo) {
      history.redo()
    } else {
      createStep({ step, annotations })
    }
  }

  function reset() {
    const { history, steps } = self
    history.withoutUndo(() => {
      steps.clear()
      history.clear()
    })
  }

  return {
    back,
    createStep,
    next,
    reset
  }
})

export default AnnotatedSteps
