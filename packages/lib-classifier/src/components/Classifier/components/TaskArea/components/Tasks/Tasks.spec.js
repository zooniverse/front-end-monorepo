import { observer } from 'mobx-react'
import React from 'react'
import { Factory } from 'rosie'
import sinon from 'sinon'
import { shallow } from 'enzyme'
import { Tasks } from './Tasks'
import asyncStates from '@zooniverse/async-states'
import taskRegistry from '@plugins/tasks'
import RootStore from '@store'
import { ProjectFactory, SubjectFactory, WorkflowFactory } from '@test/factories'
import stubPanoptesJs from '@test/stubPanoptesJs'
import en from './locales/en'

describe('Tasks', function () {
  let classification
  let step
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
        caesar: { request: sinon.stub().callsFake(() => Promise.resolve({})) },
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
      step = rootStore.workflowSteps.active
    })

    describe(`Task ${taskType}`, function () {
      it('should render without crashing', function () {
        const wrapper = shallow(<Tasks />)
        expect(wrapper).to.be.ok()
      })

      it('should render null on initialization', function () {
        const wrapper = shallow(<Tasks />)
        expect(wrapper.type()).to.be.null()
      })

      it('should render a loading UI when the workflow loading', function () {
        const wrapper = shallow(<Tasks loadingState={asyncStates.loading} />)
        expect(wrapper.contains(en.Tasks.loading)).to.be.true()
      })

      it('should render an error message when there is a loading error', function () {
        const wrapper = shallow(<Tasks loadingState={asyncStates.error} />)
        expect(wrapper.contains(en.Tasks.error)).to.be.true()
      })

      it('should render null if the workflow is loaded but has no tasks', function () {
        const wrapper = shallow(<Tasks loadingState={asyncStates.success} ready />)
        expect(wrapper.type()).to.be.null()
      })

      it('should render the correct task component if the workflow is loaded', function () {
        const wrapper = shallow(
          <Tasks
            loadingState={asyncStates.success}
            ready
            classification={classification}
            step={step}
          />
        )
        // Is there a better way to do this?
        expect(wrapper.find(TaskComponent.displayName)).to.have.lengthOf(1)
      })

      it('should not render the demo mode messaging', function () {
        const wrapper = shallow(<Tasks />)
        expect(wrapper.contains(en.Tasks.demoMode)).to.be.false()
      })

      it('should render the demo mode messaging when enabled', function () {
        const wrapper = shallow(
          <Tasks
            classification={classification}
            demoMode
            loadingState={asyncStates.success}
            subjectReadyState={asyncStates.success}
            step={step}
          />)
        expect(wrapper.contains(en.Tasks.demoMode)).to.be.true()
      })

      describe('task components', function () {
        let taskWrapper

        describe('while the subject is loading', function () {
          before(function () {
            const wrapper = shallow(
              <Tasks
                classification={classification}
                loadingState={asyncStates.success}
                subjectReadyState={asyncStates.loading}
                step={step}
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
            const wrapper = shallow(
              <Tasks
                classification={classification}
                loadingState={asyncStates.success}
                subjectReadyState={asyncStates.success}
                step={step}
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
