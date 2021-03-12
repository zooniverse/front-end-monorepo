import React from 'react'
import sinon from 'sinon'
import { mount } from 'enzyme'
import Task from './Task'
import asyncStates from '@zooniverse/async-states'
import taskRegistry from '@plugins/tasks'
import { WorkflowFactory } from '@test/factories'
import mockStore from '@test/mockStore'

describe('Components > Task', function () {
  let activeTask
  let TaskComponent
  let store

  const taskTypes = Object.keys(taskRegistry.register)

  taskTypes.forEach(function (taskType) {
    before(function () {
      const task = taskRegistry.get(taskType)
      TaskComponent = task.TaskComponent
      // DrawingTask, TranscriptionTask, DataVisAnnotationTask, TextTask all use instruction
      // SingleChoiceTask, MultipleChoiceTask use question
      // keys that aren't defined on certain task models are ignored
      // but missing keys that aren't an optional or maybe type will throw an error
      const taskSnapshot = {
        instruction: `${taskType} instructions`,
        question: `${taskType} question`,
        taskKey: 'init',
        type: taskType
      }
      const workflowSnapshot = WorkflowFactory.build({
        id: 'tasksWorkflow',
        display_name: 'A test workflow',
        tasks: {
          init: taskSnapshot
        },
        version: '0.0'
      })
      const rootStore = mockStore(workflowSnapshot)
      const step = rootStore.workflowSteps.active
      activeTask = step.tasks[0]
      store = { classifierStore: rootStore }
    })

    describe(`Task ${taskType}`, function () {
      it('should render without crashing', function () {
        const wrapper = mount(
          <Task
            store={store}
            task={activeTask}
          />
        )
        expect(wrapper).to.be.ok()
      })

      it('should render the correct task component', function () {
        const wrapper = mount(
          <Task
            store={store}
            task={activeTask}
          />
        )
        // Is there a better way to do this?
        expect(wrapper.find(TaskComponent)).to.have.lengthOf(1)
      })

      it('should pass the active annotation down to the task component', function () {
        const wrapper = mount(
          <Task
            store={store}
            task={activeTask}
          />
        )
        const { classifierStore } = store
        const classification = classifierStore.classifications.active
        const activeAnnotation = classification.annotation(activeTask)
        const taskComponent = wrapper.find(TaskComponent)
        expect(taskComponent.prop('annotation')).to.deep.equal(activeAnnotation)
      })

      describe('task components', function () {
        let taskWrapper

        describe('while the subject is loading', function () {
          before(function () {
            store.classifierStore.subjectViewer.resetSubject()
            const wrapper = mount(
              <Task
                store={store}
                task={activeTask}
              />
            )
            taskWrapper = wrapper.find(TaskComponent)
          })

          it('should be disabled', function () {
            expect(taskWrapper.prop('disabled')).to.be.true()
          })
        })

        describe('when the subject viewer is ready', function () {
          before(function () {
            store.classifierStore.subjectViewer.onSubjectReady()
            const wrapper = mount(
              <Task
                store={store}
                task={activeTask}
              />
            )
            taskWrapper = wrapper.find(TaskComponent)
          })

          it('should be enabled', function () {
            expect(taskWrapper.prop('disabled')).to.be.false()
          })
        })
      })
    })
  })
})
