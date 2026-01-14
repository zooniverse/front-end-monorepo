import * as tasks from '@plugins/tasks'

/**
 * Get the task plugin for a given task type.
 *
 * IMPORTANT: This intentionally does NOT map 'dropdown' to dropdownSimple.
 * The legacy 'dropdown' type has two scenarios:
 * 1. Single-menu dropdown: Converted to 'dropdown-simple' by legacyDropdownAdapter
 * 2. Cascading dropdown (multiple menus): Cannot be converted, stays as 'dropdown'
 *
 * If a task still has type 'dropdown' after processing, it means the adapter
 * couldn't convert it, so it should be treated as unsupported.
 *
 * @param {string} taskType - The task type from the workflow
 * @returns {Object|undefined} The task plugin object with TaskComponent, TaskModel, etc.
 */
export default function getTaskPlugin(taskType) {
  switch (taskType) {
    case 'dropdown-simple':
      // Only 'dropdown-simple' (converted by adapter) should use dropdownSimple plugin
      return tasks.dropdownSimple
    case 'dropdown':
      // Legacy 'dropdown' that wasn't converted = unsupported (cascading dropdown)
      return undefined
    default:
      return tasks[taskType]
  }
}
