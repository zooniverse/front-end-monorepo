# ADR 35: Adding undo/redo to workflow steps

8 November 2021

## Context

For Engaging Crowds, we wanted to support workflows with both branching steps (a single answer question leads to different tasks, depending on the selected answer) and recursive steps (a given task can be returned to and annotated multiple times for a single subject.) Volunteers should be able to move backward and forward through these workflows without losing any work they'd already done.

## Decision

We solved this problem by adding an undo/redo history stack to the classifier task area. [#2050](https://github.com/zooniverse/front-end-monorepo/pull/2050) added a global history stack (`store.annotatedSteps`). [#2520](https://github.com/zooniverse/front-end-monorepo/pull/2520) refines this by moving from a global history manager to individual history management for each subject (`subject.stepHistory`.)

History is managed by the MST middleware [`UndoManager`](https://github.com/mobxjs/mobx-state-tree/blob/master/packages/mst-middlewares/README.md#undomanager), which records snapshots of a single subtree in the store. Each history item is a single step key and one or more annotation IDs, representing the current state of the task area. 'Back' loads the previous step key and annotation IDs from history. 'Next' loads the next step key and annotation IDs, or creates a new history item if one doesn't exist already. Going back then changing branches, for a branching workflow, clears any existing redo history and starts a fresh history from the current point.

## Consequences

- `workflow.configuration.persistAnnotations` defaults to `true` for all workflows. Annotation values are remembered unless we explicitly turn this feature off.
- Annotation values are remembered for recursive, looping workflows. A feature that wasn't supported in <abbr title="Panoptes-Front-End">PFE</abbr>.
- Annotations can't be undone and redone without generating a new empty annotation. To work around this, annotation changes are wrapped in `UndoManager.withoutUndo()` in the code. A future iteration could rewrite the classifications model to allow for undoing and redoing annotations, without destroying their values.
- `store.classifications` and `store.workflowSteps` are independent subtrees, so can't be tracked directly by the undo manager. A future iteration of the classifier model could store steps and annotations in the same subtree, which would simplify history management.


## Status

Proposed
