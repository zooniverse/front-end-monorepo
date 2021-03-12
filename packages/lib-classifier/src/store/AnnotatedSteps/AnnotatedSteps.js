import cuid from 'cuid'
import { getRoot, tryReference, types } from 'mobx-state-tree'
import { UndoManager } from 'mst-middlewares'

import AnnotatedStep from './AnnotatedStep'

let undoManager = {}
function setUndoManager(targetStore) {
    undoManager = UndoManager.create({}, { targetStore })
}
/**
  A history manager which records completed steps, from store.workflowSteps, and annotations, from store.classifications.
*/
const AnnotatedSteps = types.model('AnnotatedSteps', {
  /** Completed steps, with their annotations */
  steps: types.map(AnnotatedStep)
})
.views(self => ({
  /** a flattened array of all annotations for all completed steps. */
  get annotations() {
    let annotations = []
    self.steps.forEach(step => {
      annotations = annotations.concat(step.annotations)
    })
    return annotations
  },
  get classification() {
    const { classifications } = getRoot(self)
    const classification = tryReference(() => classifications.active)
    return classification
  },
  /** Boolean flag. True when an undo history exists. */
  get canUndo() {
    return undoManager.canUndo
  },
  /** The latest step in the workflow, with its annotations. */
  get latest() {
    const stepsArray = Array.from(self.steps.values())
    const { length } = stepsArray
    return stepsArray[length - 1]
  }
}))
.actions(self => {
  setUndoManager(self)

  /** Create a new history entry from the current active step. **/
  function _beginStep(stepKey) {
    _selectStep(stepKey)
    const { workflowSteps } = getRoot(self)
    const step = tryReference(() => workflowSteps.active)
    if (self.classification && step) {
      let annotations
      undoManager.withoutUndo(() => {
        annotations = step.tasks.map(task => self.classification.createAnnotation(task))
      })
      const historyStep = {
        id: cuid(),
        step,
        annotations
      }
      console.log(`Adding ${historyStep.step.stepKey} to history`)
      self.steps.put(historyStep)
    }
  }
  /** clear pending annotations from the classification. */
  function _clearPendingAnnotations() {
    self.classification.annotations.forEach(annotation => {
      const exists = self.annotations.includes(annotation)
      if (!exists) {
        self.classification.removeAnnotation(annotation)
      }
    })
  }
  /** Get the step for a given task key */
  // TODO put this in the WorkflowSteps store?
  function _getTaskStepKey(taskKey) {
    const { workflowSteps } = getRoot(self)
    let stepKey
    workflowSteps.steps.forEach(step => {
      if (step.taskKeys.includes(taskKey)) {
        stepKey = step.stepKey
      }
    })
    return stepKey
  }
  /** Redo stepKey,or replace the last step if history has diverged. */
  function _redo(stepKey) {
    undoManager.redo()
    const storedStepKey = self.latest.step.stepKey
    console.log(`redo ${storedStepKey}`)
    if (stepKey !== storedStepKey) {
      console.log(`replace ${storedStepKey} with ${stepKey}`)
      _replace(stepKey)
    }
  }
  /** Clear the redo history and restart history from this point with a new step. */
  function _replace(stepKey) {
    undoManager.undo()
    self.clearRedo()
    _beginStep(stepKey)
  }
  /** Clear stored steps and history. Should be run before classifying a new subject. */
  function _reset() {
    self.steps.clear()
    undoManager.clear()
  }
  /** select a new active workflow step */
  function _selectStep(stepKey) {
    const { workflowSteps } = getRoot(self)
    workflowSteps.selectStep(stepKey)
  }
  /** Undo the current step and select the previous step. */
  function back(persistAnnotations = true) {
    if (undoManager.canUndo) {
      undoManager.undo()
      if (!persistAnnotations) {
        self.clearRedo()
      }
      const { step } = self.latest
      _selectStep(step.stepKey)
    }
  }
  /** Clear the redo history and delete orphaned annotations. */
  function clearRedo() {
    undoManager.withoutUndo(() => {
      _clearPendingAnnotations()
      undoManager.clearRedo()
    })
  }
  /** Redo the next step, or add a new step to history if there is no redo. */
  function next() {
    let nextStepKey = self.latest.nextStepKey()
    // look up steps from task keys for backwards compatibility
    if (nextStepKey?.startsWith('T')) {
      nextStepKey = _getTaskStepKey(nextStepKey)
    }
    if (undoManager.canRedo) {
      _redo(nextStepKey)
    } else {
      _beginStep(nextStepKey)
    }
  }
  /** Start a new history. The first step in a workflow cannot be undone. */
  function start() {
    // the first step in a workflow can't be undone
    undoManager.withoutUndo(() => {
      _reset()
      _beginStep()
    })
  }

  return {
    back,
    clearRedo,
    next,
    start
  }
})

export default AnnotatedSteps
