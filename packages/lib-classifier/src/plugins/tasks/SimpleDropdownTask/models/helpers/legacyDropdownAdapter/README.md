# legacyDropdownAdapter

`legacyDropdownAdapter` enables us to use the simple dropdown task with projects that were built using the original dropdown task editor in the Project Builder. It is a filter function that takes a JSON task snapshot, from a Panoptes workflow, and returns a new snapshot. The new snapshot will either be a simple dropdown task snapshot, for single menu dropdown tasks, or the original task otherwise.

It can be removed/disabled once we have support for the new task in the project builder. Remove it by removing the preprocessor from the task model, and remove the registration for the `dropdown` task type in the classifier Step model.

```js
  const snapshot = workflow.tasks.T0
  /*
  newTaskSnapshot will be a simple dropdown task, if T0 is a dropdown task with a single menu.
  Otherwise, it will be the original task snapshot.
  */
  newTaskSnapshot = legacyDropdownAdapter(snapshot)
```
