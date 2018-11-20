import ProjectStore from './ProjectStore'
import RootStore from './RootStore'
import WorkflowStore from './WorkflowStore'
import {
  SingleChoiceTaskFactory,
  ProjectFactory,
  SubjectFactory,
  WorkflowFactory
} from '../../test/factories'
import stubPanoptesJs from '../../test/stubPanoptesJs'

const workflow = WorkflowFactory.build({
  tasks: { T1: SingleChoiceTaskFactory.build() },
  steps: [['S1', { taskKeys: ['T1'] }]]
})
const subject = SubjectFactory.build()
const projectWithDefault = ProjectFactory.build({}, { activeWorkflowId: workflow.id })
const projectWithoutDefault = ProjectFactory.build({ configuration: { default_workflow: undefined } }, { activeWorkflowId: workflow.id })

xdescribe('Model > WorkflowStore', function () {
  it('should exist', function () {
    expect(WorkflowStore).to.be.an('object')
  })

  describe('workflow selection', function () {
    describe('when there is a project default', function () {
      let clientStub
      let rootStore

      before(function () {
        clientStub = stubPanoptesJs({
          projects: projectWithDefault,
          subjects: subject,
          workflows: workflow
        })

        rootStore = RootStore.create({
          projects: ProjectStore.create(),
          workflows: WorkflowStore.create()
        }, { client: clientStub })

        rootStore.projects.setActive(projectWithDefault.id)
      })

      it('should set the active workflow to the project.configuration.default_workflow', function () {
        const workflowStore = rootStore.workflows.toJSON()
        expect(workflowStore.active).to.equal(projectWithDefault.configuration.default_workflow)
      })
    })

    describe('when there is not an active project', function () {
      let clientStub
      let rootStore
      before(function () {
        clientStub = stubPanoptesJs({
          projects: projectWithoutDefault,
          subjects: subject,
          workflows: workflow
        })
        rootStore = RootStore.create({
          projects: ProjectStore.create(),
          workflows: WorkflowStore.create({})
        }, { client: clientStub })
        rootStore.projects.setActive(projectWithoutDefault.id)
      })

      it('should set the active workflow to a random active workflow', function () {
        const workflowStore = rootStore.workflows.toJSON()
        expect(projectWithoutDefault.configuration.default_workflow).to.be.undefined
        expect(projectWithoutDefault.links.active_workflows.includes(workflowStore.active)).to.be.true
      })
    })
  })
})
