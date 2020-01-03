# ADR-23 Tasks as classifier plugins

## Context
We'd like the new classifier to be easily extensible. However, adding new tasks to the classifier involved updating the code in several places:
- add new code in three places:
  - [task views](https://github.com/zooniverse/front-end-monorepo/blob/2e2ac27a442afc8cfaea6f7735b97ebb511367a8/packages/lib-classifier/src/components/Classifier/components/TaskArea/components/Tasks).
  - [task models](https://github.com/zooniverse/front-end-monorepo/blob/2e2ac27a442afc8cfaea6f7735b97ebb511367a8/packages/lib-classifier/src/store/tasks).
  - [annotation models](https://github.com/zooniverse/front-end-monorepo/blob/2e2ac27a442afc8cfaea6f7735b97ebb511367a8/packages/lib-classifier/src/store/annotations).
- import the new modules by name in several places, and register them:
  - [registered views](https://github.com/zooniverse/front-end-monorepo/blob/2e2ac27a442afc8cfaea6f7735b97ebb511367a8/packages/lib-classifier/src/components/Classifier/components/TaskArea/components/Tasks/helpers/getTaskComponent.js).
  - [import tasks models for workflow steps](https://github.com/zooniverse/front-end-monorepo/blob/2e2ac27a442afc8cfaea6f7735b97ebb511367a8/packages/lib-classifier/src/store/WorkflowStepStore.js#L5-L18).
  - [import all annotations to the classification model](https://github.com/zooniverse/front-end-monorepo/blob/2e2ac27a442afc8cfaea6f7735b97ebb511367a8/packages/lib-classifier/src/store/Classification.js#L3).
  - [register annotations with the classifications store](https://github.com/zooniverse/front-end-monorepo/blob/2e2ac27a442afc8cfaea6f7735b97ebb511367a8/packages/lib-classifier/src/store/ClassificationStore.js#L111-L120).

It was easy to forget one of these steps and a lot of this could be automated in code.

## Decision

- Keep all the code together. Store task views and models next to each other in the filesystem. (#1212)
- Import named modules to a registry object (or similar) then load them in to other code from that register. (#1212)
- Delegate responsibility from the classification to individual tasks. (#1228)

### Implementation

- Task code was moved to `lib-classifier/src/plugins/tasks`. Each task has its own directory, with these subdirectories:
  - _components_: React components to render the task.
  - _models_: MobX State Tree models for the task. One Task model and one Annotation model.
- a _taskRegistry_ object was added, which is described in the [tasks README](https://github.com/zooniverse/front-end-monorepo/blob/master/packages/lib-classifier/src/plugins/tasks/readme.md).
- Responsibility for creating new annotations was removed from the classifications store, removing the need for the classifications store to know about different types of tasks and how to create an annotation for each. New methods were added to the task models to delegate responsibility and make tasks more flexible:
  - _task.createAnnotation()_ creates a new annotation of the correct type for a specific task.
  - _task.defaultAnnotation_ (read-only) returns the default annotation for a specific task.

## Status

Accepted

## Consequences

- A similar architecture could be used to register subject viewers with the classifier.
- Tasks could be removed completely from the classifier. When a workflow loads, its tasks could be instantiated outside the classifier and only the tasks needed for the workflow could be passed in as props.
- The classifier could make better use of the MobX State Tree. A classification could store the tasks used to generate that classification, each task holding a reference to its own annotation. This opens up the possibility of more flexible code for tracking workflow history and handling recursive workflows. We could also take advantage of the tree (via _getParent()_ or _getParentOfType()_) to easily reference the task that generated a specific annotation, or the classification that a task is currently doing work for.
- the registry model has no equivalent for `import { SingleChoiceAnnotation, MultipleChoiceAnnotation, TextAnnotation } from '@plugins/tasks/models/annotations'`. It would be helpful, but not necessary, to be able to do this when setting up classifier stores.
- the task registry is only available after the task models have been set up and initialised, limiting its usefulness when accessing models in order to set up other models, such as drawing tools.
