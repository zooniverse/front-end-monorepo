# Classifier tasks
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