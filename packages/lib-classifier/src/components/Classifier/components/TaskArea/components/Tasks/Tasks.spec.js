import { observer } from 'mobx-react'
import React from 'react'
import { Factory } from 'rosie'
import sinon from 'sinon'
import { shallow } from 'enzyme'
import { Tasks } from './Tasks'
import asyncStates from '@zooniverse/async-states'
import SingleChoiceTask from '@plugins/tasks/SingleChoiceTask'
import taskRegistry from '@plugins/tasks'
import RootStore from '@store'
import { ProjectFactory, SubjectFactory, WorkflowFactory } from '@test/factories'
import stubPanoptesJs from '@test/stubPanoptesJs'

describe('Tasks', function () {
  let classification
  let step
  let tasks
  let TaskComponent

  const taskTypes = Object.keys(taskRegistry.register)

  taskTypes.forEach(function (taskType) {
    before(function () {
      const task = taskRegistry.get(taskType)
      TaskComponent = observer(task.TaskComponent)
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
      rootStore.workflows.setResource(workflowSnapshot)
      rootStore.workflows.setActive(workflowSnapshot.id)
      rootStore.subjects.setResource(subjectSnapshot)
      rootStore.subjects.setActive(subjectSnapshot.id)
      rootStore.subjectViewer.onSubjectReady()
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
        expect(wrapper.contains('Loading')).to.be.true()
      })

      it('should render an error message when there is a loading error', function () {
        const wrapper = shallow(<Tasks loadingState={asyncStates.error} />)
        expect(wrapper.contains('Something went wrong')).to.be.true()
      })

      it('should render null if the workflow is load but has no tasks', function () {
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
