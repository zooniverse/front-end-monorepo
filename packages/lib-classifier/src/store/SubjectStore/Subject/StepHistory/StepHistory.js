import cuid from 'cuid'
import { autorun } from 'mobx'
import { addDisposer, getRoot, tryReference, types } from 'mobx-state-tree'
import { UndoManager } from 'mst-middlewares'

import AnnotatedStep from './AnnotatedStep'

function beforeUnloadListener(event) {
  event.preventDefault()
  return event.returnValue = 'You have unsaved work. Are you sure you want to leave?'
}

function setUndoManager(targetStore) {
  targetStore.undoManager = UndoManager.create({}, { targetStore })
}

/**
  A history manager which records completed steps, from store.workflowSteps, and annotations, from store.classifications.
*/
const StepHistory = types.model('StepHistory', {
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
    return self.undoManager.canUndo
  },
  /** Checks if the user has started making any annotations. Returns boolean */
  get checkForProgress() {
    let progressFlag = false
    self.annotations.forEach(annotation => {
        progressFlag ||= annotation._inProgress
      })
    return progressFlag
  },
  get hasNextStep() {
    if (self.latest) {
      const { nextStepKey } = self.latest
      return !!nextStepKey && nextStepKey !== 'summary'
    }
    return false
  },
  /** The latest step in the workflow, with its annotations. */
  get latest() {
    const stepsArray = Array.from(self.steps.values())
    const { length } = stepsArray
    return stepsArray[length - 1]
  }
}))
.actions(self => {
  self.undoManager = {}
  setUndoManager(self)

  /** Create a new history entry from the current active step. **/
  function _beginStep(stepKey) {
    const { workflowSteps } = getRoot(self)
    workflowSteps.selectStep(stepKey)
    const step = tryReference(() => workflowSteps.active)
    if (self.classification && step) {
      let annotations
      self.undoManager.withoutUndo(() => {
        annotations = step.tasks.map(task => self.classification.createAnnotation(task))
      })
      const historyStep = {
        id: cuid(),
        step,
        annotations
      }
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
  /** Clear the redo history and delete orphaned annotations. */
  function _clearRedo() {
    self.undoManager.withoutUndo(() => {
      _clearPendingAnnotations()
      self.undoManager.clearRedo()
    })
  }
  /** Add or remove a beforeunload listener whenever checkForProgress changes. */
  function _observeWorkInProgress() {
    const { addEventListener, removeEventListener } = window
    if (self.checkForProgress) {
      addEventListener && addEventListener("beforeunload", beforeUnloadListener, {capture: true});
    } else {
      removeEventListener && removeEventListener("beforeunload", beforeUnloadListener, {capture: true});
    }
  }
  /** Redo stepKey,or replace the last step if history has diverged. */
  function _redo(stepKey) {
    self.undoManager.redo()
    const storedStepKey = self.latest.step.stepKey
    if (stepKey !== storedStepKey) {
      _replace(stepKey)
    }
  }
  /** Clear the redo history and restart history from this point with a new step. */
  function _replace(stepKey) {
    self.undoManager.undo()
    _clearRedo()
    _beginStep(stepKey)
  }
  /** Clear stored steps and history. Should be run before classifying a new subject. */
  function _reset() {
    self.steps.clear()
    self.undoManager.clear()
  }
  function afterAttach() {
    const workInProgressDisposer = autorun(_observeWorkInProgress)
    addDisposer(self, workInProgressDisposer)
  }
  /** Undo the current step and select the previous step. */
  function back(persistAnnotations = true) {
    if (self.undoManager.canUndo) {
      self.undoManager.undo()
      if (!persistAnnotations) {
        _clearRedo()
      }
    }
  }
  /** Finish the current subject and clear the redo history*/
  function finish(){
    const { removeEventListener } = window
    removeEventListener && removeEventListener("beforeunload", beforeUnloadListener, {capture: true});
    self.undoManager.withoutUndo(() => {
      _clearRedo()
    })
  }
  /** Redo the next step, or add a new step to history if there is no redo. */
  function next() {
    const { nextStepKey } = self.latest
    if (self.undoManager.canRedo) {
      _redo(nextStepKey)
    } else {
      _beginStep(nextStepKey)
    }
  }
  /** Start a new history. The first step in a workflow cannot be undone. */
  function start() {
    // the first step in a workflow can't be undone
    self.undoManager.withoutUndo(() => {
      _beginStep()
    })
  }

  return {
    afterAttach,
    back,
    finish,
    next,
    start
  }
})

export default StepHistory
