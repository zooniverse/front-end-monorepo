# Classifier tasks
## Importing tasks

```js
import * as tasks from '@plugins/tasks'
const multipleChoiceTask = tasks.multiple
const type = 'drawing'
const dynamicTask = tasks[type]
```

The default tasks export is a simple map of unique task types (`single`, `multiple`, `text`, `drawing` etc.) to Task objects, each of which has the shape `{ TaskComponent, TaskModel, AnnotationModel }`.

### API
  - `taskRegistry.add(type (string), Task (object))`: registers `Task` as `type` or errors if `type` is already registered.
  - `taskRegistry.remove(type (string))`: remove any existing entry for `type`.
  - `taskRegistry.get(type (string))`: return the `Task` for `type`, or an empty object.
  - `taskRegistry.values(property ('TaskComponent|TaskModel|AnnotationModel'))`: return all registered Tasks. Specify an optional property to return an array of only those properties eg. `const annotationModels = taskRegistry.values('AnnotationModel')`.
  
## Adding a new task
  - create a new directory under `tasks` for your task.
  - export a view component and task and annotation models.
  ```js
  import { default as TaskComponent } from './components/MyNewTask'
  import { default as TaskModel } from './models/MyNewTask'
  import { default as AnnotationModel } from './models/MyNewAnnotation'
  
  export default {
    TaskComponent,
    TaskModel,
    AnnotationModel
  }
  ```
  - export your task from `tasks/index.js`, using the task type as the named export.
  ```js
    export { default as myNewTask } from './myNewTask'
  ```

## React Components

A React component for a task takes a Task model and renders it as HTML. The basic shape is:
```jsx
import * as tasks from '@plugins/tasks'
const SingleChoiceTask = tasks.single.TaskComponent
<SingleChoiceTask disabled annotation={annotation} task={task} />
```

 - _annotation_ is an annotation for this task. An individual task may have multiple annotations. It's the responsibility of the Task component's container to pass the correct annotation for the current task eg. the correct line for a text transcription task.
 - _task_ is the task model to render.
 - _disabled_ should be set if the task is disabled eg. while waiting for a subject to load.

## Task models

```js
import * as tasks from '@plugins/tasks'
const SingleChoiceTask = tasks.single.TaskModel
```

The [base Task model](https://github.com/zooniverse/front-end-monorepo/tree/master/packages/lib-classifier/src/plugins/tasks/models/Task.js) defines the following common properties and actions for all tasks.

- _taskKey (string)_ An identifier for the task eg. `T0`
- _required (boolean = false)_ True if the task must be annotated before continuing.
- _annotation (Annotation)_ DEPRECATED The classification annotation for this task's task key.
- _isComplete(annotation) (boolean = true)_ False if the task is required and `annotation` is invalid.
- _createAnnotation() (Annotation)_ Returns a new, empty annotation for this task. 


All tasks should extend the Task model by implementing the following:

- _defaultAnnotation(id) (Annotation)_ return a new default annotation for this task. The `id` parameter is optional and defaults to a generated id using cuid.
- _type (string)_ the type of task eg. `single`, `text`, `drawing`. Types must be unique to each Task model.

Tasks may implement the following actions to hook into the workflow classification lifecycle
- _reset()_ Reset the task for a new subject and annotation.
- _start()_ Runs each time we enter the step's task while navigating a workflow.
- _complete(annotation)_ Runs when exiting a step task by pressing Next or Done.
- _validate_ Runs when exiting a step task by pressing Next or Done. Intended for annotation validation, but could be used for any kind of validation if it must run on step Next or Done. Drawing task deletes invalid tool marks when this is called.

## Annotation models

```js
import * as tasks from '@plugins/tasks'
const SingleChoiceAnnotation = tasks.single.AnnotationModel
```

The [base Annotation model](https://github.com/zooniverse/front-end-monorepo/tree/master/packages/lib-classifier/src/plugins/tasks/models/Annotation.js) defines the following common properties and actions for all annotations.

- _task (string)_ An identifier for the task that created this annotation eg. `T0`
- _taskType (string)_ The task type that creates these annotations. Set by the annotation's task.
- _update(value)_ Set the annotation's value.

All annotations should extend the Annotation model by implementing the following:

- _value (any)_ The annotation value.

Annotations may implement the following:

- _isComplete (boolean = true)_ False if the annotation's value is invalid.
