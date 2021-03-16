import { difference, isEqual } from 'lodash'

function getNextStepFromTaskKey(taskKey, steps, tasks) {
  let nextStepKey = getStepKeyFromTaskKey(steps, taskKey)
  if (!nextStepKey) {
    const comboTask = tasks[taskKey]
    steps.forEach(([stepkey, step]) => {
      if (isEqual(step.taskKeys, comboTask.tasks)) {
        nextStepKey = step.stepKey
      }
    })
  }
  return nextStepKey
}

function getStepKeyFromTaskKey(steps, taskKey) {
  let taskStepKey
  steps.forEach(([stepKey, step]) => {
    if (step.taskKeys.includes(taskKey)) {
      taskStepKey = step.stepKey
    }
  })
  return taskStepKey
}

function getTaskKeysIncludedInComboTasks (tasks) {
  let taskKeys
  const comboTasks = Object.values(tasks).filter(task => task?.type === 'combo')
  taskKeys = comboTasks.map(combo => combo.tasks)
  return taskKeys.flat()
}

function isThereBranching (task) {
  return task?.answers?.some((answer, index) => {
    if (task.answers.length > index + 1) {
      return answer.next !== task.answers[index + 1].next
    }
    return false
  })
}

export default function convertWorkflowToUseSteps ({ first_task, tasks }) {
  const steps = []
  const taskKeys = Object.keys(tasks)

  const taskKeysIncludedInComboTasks = getTaskKeysIncludedInComboTasks(tasks)
  const taskKeysToConvertToSteps = difference(taskKeys, taskKeysIncludedInComboTasks)

  const firstTask = tasks[first_task]

  if (first_task) {
    let firstStep = {
      next: firstTask.next, // temporarily set next to task key, convert to step key once steps created
      stepKey: 'S0',
      taskKeys: [first_task]
    }

    if (firstTask.type === 'combo') {
      firstStep.taskKeys = firstTask.tasks
    }

    const isFirstSingleChoiceTaskNotBranching = firstTask.type === 'single' && !isThereBranching(firstTask)
    if (isFirstSingleChoiceTaskNotBranching) {
      firstStep.next = firstTask.answers[0]?.next
    }

    taskKeysToConvertToSteps.splice(taskKeysToConvertToSteps.indexOf(first_task), 1)

    steps.push(['S0', firstStep])
  }

  taskKeysToConvertToSteps.forEach((taskKey, index) => {
    const task = tasks[taskKey]
    if (task.type !== 'shortcut') {
      const stepKey = `S${index + 1}`
      let stepTasks = [taskKey]
      if (task.type === 'combo') {
        stepTasks = task.tasks
      }

      let stepSnapshot = {
        next: task.next, // temporarily set next to task key, convert to step key once steps created
        stepKey,
        taskKeys: stepTasks
      }

      const isSingleChoiceTaskNotBranching = task.type === 'single' && !isThereBranching(task)
      if (isSingleChoiceTaskNotBranching) {
        stepSnapshot.next = task.answers && task.answers[0]?.next
      }

      steps.push([stepKey, stepSnapshot])
    }
  })

  // convert step.next from task key to step key
  steps.forEach(([stepKey, step]) => {
    if (Object.keys(tasks).includes(step.next)) {
      step.next = getNextStepFromTaskKey(step.next, steps, tasks)
    }
  })

  // convert single choice answers to use step keys
  Object.values(tasks).forEach(task => {
    if (task.type === 'single') {
      task.answers?.forEach(answer => {
        if (answer.next?.startsWith('T')) {
          answer.next = getNextStepFromTaskKey(answer.next, steps, tasks)
        }
      })
    }
  })

  return { steps, tasks }
}