import { observer } from 'mobx-react'
import React from 'react'
import { Factory } from 'rosie'
import sinon from 'sinon'
import { mount } from 'enzyme'
import Task from './Task'
import asyncStates from '@zooniverse/async-states'
import taskRegistry from '@plugins/tasks'
import RootStore from '@store'
import { ProjectFactory, SubjectFactory, WorkflowFactory } from '@test/factories'
import stubPanoptesJs from '@test/stubPanoptesJs'

describe('Components > Task', function () {
  let classification
  let activeTask
  let TaskComponent

  const taskTypes = Object.keys(taskRegistry.register)

  taskTypes.forEach(function (taskType) {
    before(function () {
      const task = taskRegistry.get(taskType)
      TaskComponent = observer(task.TaskComponent)
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
      const subjectSnapshot = SubjectFactory.build({
        id: 'subject',
        metadata: {}
      })
      const projectSnapshot = ProjectFactory.build({
        id: 'project'
      })
      const { panoptes } = stubPanoptesJs({
        field_guides: [],
        projects: [projectSnapshot],
        subjects: Factory.buildList('subject', 10),
        tutorials: [],
        workflows: [workflowSnapshot]
      })
      const client = {
        panoptes,
        tutorials: {
          get: sinon.stub().callsFake(() =>
            Promise.resolve({ body: {
              tutorials: []
            }})
          )
        }
      }
      const rootStore = RootStore.create({
        projects: {
          active: projectSnapshot.id,
          resources: {
            [projectSnapshot.id]: projectSnapshot
          }
        },
        subjects: {
          active: subjectSnapshot.id,
          resources: {
            [subjectSnapshot.id]: subjectSnapshot
          }
        },
        workflows: {
          active: workflowSnapshot.id,
          resources: {
            [workflowSnapshot.id]: workflowSnapshot
          }
        }
      }, {
        authClient: {
          checkBearerToken: sinon.stub().callsFake(() => Promise.resolve(null)),
          checkCurrent: sinon.stub().callsFake(() => Promise.resolve(null))
        },
        client
      })
      rootStore.workflows.setResources([workflowSnapshot])
      rootStore.workflows.setActive(workflowSnapshot.id)
      rootStore.subjects.setResources([subjectSnapshot])
      rootStore.subjects.advance()
      classification = rootStore.classifications.active
      const step = rootStore.workflowSteps.active
      activeTask = step.tasks[0]
    })

    describe(`Task ${taskType}`, function () {
      it('should render without crashing', function () {
        const wrapper = mount(
          <Task
            classification={classification}
            task={activeTask}
          />
        )
        expect(wrapper).to.be.ok()
      })

      it('should render the correct task component', function () {
        const wrapper = mount(
          <Task
            classification={classification}
            task={activeTask}
          />
        )
        // Is there a better way to do this?
        expect(wrapper.find(TaskComponent.displayName)).to.have.lengthOf(1)
      })

      describe('task components', function () {
        let taskWrapper

        describe('while the subject is loading', function () {
          before(function () {
            const wrapper = mount(
              <Task
                classification={classification}
                disabled={true}
                task={activeTask}
              />
            )
            taskWrapper = wrapper.find(TaskComponent.displayName)
          })

          it('should be disabled', function () {
            expect(taskWrapper.prop('disabled')).to.be.true()
          })
        })

        describe('when the subject viewer is ready', function () {
          before(function () {
            const wrapper = mount(
              <Task
                classification={classification}
                disabled={false}
                task={activeTask}
              />
            )
            taskWrapper = wrapper.find(TaskComponent.displayName)
          })

          it('should be enabled', function () {
            expect(taskWrapper.prop('disabled')).to.be.false()
          })
        })
      })
    })
  })
})
