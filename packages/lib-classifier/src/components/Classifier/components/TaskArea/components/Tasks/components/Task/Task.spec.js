import React from 'react'
import { mount } from 'enzyme'
import Task from './Task'
import * as tasks from '@plugins/tasks'
import { WorkflowFactory } from '@test/factories'
import mockStore from '@test/mockStore'
import { Grommet } from 'grommet'
import { zooTheme } from '@zooniverse/grommet-theme'

describe('Components > Task', function () {
  let activeTask
  let TaskComponent
  let store

  Object.keys(tasks).forEach(function (taskType) {
    before(function () {
      const task = tasks[taskType]
      TaskComponent = task.TaskComponent
      // DrawingTask, TranscriptionTask, DataVisAnnotationTask, TextTask all use instruction
      // SingleChoiceTask, MultipleChoiceTask use question
      // keys that aren't defined on certain task models are ignored
      // but missing keys that aren't an optional or maybe type will throw an error
      const type = taskType === 'dropdownSimple' ? 'dropdown-simple' : taskType
      const taskSnapshot = {
        answers: [],
        instruction: `${taskType} instructions`,
        options: [ '1', '2', '3', '4'],
        question: `${taskType} question`,
        taskKey: 'init',
        type
      }
      const workflowSnapshot = WorkflowFactory.build({
        id: 'tasksWorkflow',
        display_name: 'A test workflow',
        tasks: {
          init: taskSnapshot
        },
        version: '0.0'
      })
      store = mockStore({ workflow: workflowSnapshot })
      const step = store.workflowSteps.active
      activeTask = step.tasks[0]
    })

    describe(`Task ${taskType}`, function () {
      it('should render without crashing', function () {
        const wrapper = mount(
          <Task
            store={store}
            task={activeTask}
          />, {
            wrappingComponent: Grommet,
            wrappingComponentProps: { theme: zooTheme }
          }
        )
        expect(wrapper).to.be.ok()
      })

      it('should render the correct task component', function () {
        const wrapper = mount(
          <Task
            store={store}
            task={activeTask}
          />, {
          wrappingComponent: Grommet,
          wrappingComponentProps: { theme: zooTheme }
        })
        // Is there a better way to do this?
        expect(wrapper.find(TaskComponent)).to.have.lengthOf(1)
      })

      it('should pass the active annotation down to the task component', function () {
        const wrapper = mount(
          <Task
            store={store}
            task={activeTask}
          />, {
          wrappingComponent: Grommet,
          wrappingComponentProps: { theme: zooTheme }
        })
        const classification = store.classifications.active
        const activeAnnotation = classification.annotation(activeTask)
        const taskComponent = wrapper.find(TaskComponent)
        expect(taskComponent.prop('annotation')).to.deep.equal(activeAnnotation)
      })

      describe('task components', function () {
        let taskWrapper

        describe('while the subject is loading', function () {
          before(function () {
            store.subjectViewer.resetSubject()
            const wrapper = mount(
              <Task
                store={store}
                task={activeTask}
              />, {
              wrappingComponent: Grommet,
              wrappingComponentProps: { theme: zooTheme }
            })
            taskWrapper = wrapper.find(TaskComponent)
          })

          it('should be disabled', function () {
            expect(taskWrapper.prop('disabled')).to.be.true()
          })
        })

        describe('when the subject viewer is ready', function () {
          before(function () {
            store.subjectViewer.onSubjectReady()
            const wrapper = mount(
              <Task
                store={store}
                task={activeTask}
              />, {
              wrappingComponent: Grommet,
              wrappingComponentProps: { theme: zooTheme }
            })
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
