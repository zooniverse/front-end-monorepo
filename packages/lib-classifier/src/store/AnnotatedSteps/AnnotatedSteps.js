import cuid from 'cuid'
import { types } from 'mobx-state-tree'
import { UndoManager } from 'mst-middlewares'

import AnnotatedStep from './AnnotatedStep'

let undoManager = {}
function setUndoManager(targetStore) {
    undoManager = UndoManager.create({}, { targetStore })
}

const AnnotatedSteps = types.model('AnnotatedSteps', {
  steps: types.map(AnnotatedStep)
})
.views(self => ({
  get canUndo() {
    return undoManager.canUndo
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
    if (undoManager.canUndo) {
      undoManager.undo()
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
    if (undoManager.canRedo) {
      undoManager.redo()
    } else {
      createStep({ step, annotations })
    }
  }

  function reset() {
    undoManager.withoutUndo(() => {
      self.steps.clear()
      undoManager.clear()
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
