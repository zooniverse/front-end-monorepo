# Classifier tasks
## Task registry

```js
import taskRegistry from '@plugins/tasks'
```

The registry is a simple map of unique task types (`single`, `multiple`, `text`, `drawing` etc.) to Task objects, which have the shape `{ TaskComponent, TaskModel, AnnotationModel }`.

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
  ```
  - import your task into `tasks/index.js` and add it to the list of registered tasks.
  ```js
  import MyNewTask from './MyNewTask'
  …
  taskRegistry.add('newTask', MyNewTask)
  ```