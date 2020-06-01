import { Factory } from 'rosie'
import RootStore from './RootStore'
import WorkflowStore from './WorkflowStore'
import {
  SingleChoiceTaskFactory,
  ProjectFactory,
  WorkflowFactory
} from '@test/factories'
import stubPanoptesJs from '@test/stubPanoptesJs'

describe('Model > WorkflowStore', function () {
  const workflow = WorkflowFactory.build({
    tasks: { T1: SingleChoiceTaskFactory.build() },
    steps: [['S1', { taskKeys: ['T1'] }]]
  })
  const projectWithDefault = ProjectFactory.build({}, { activeWorkflowId: workflow.id })
  const projectWithoutDefault = ProjectFactory.build({ configuration: { default_workflow: undefined } }, { activeWorkflowId: workflow.id })

  function setupStores (clientStub, project) {
    const store = RootStore.create({
      classifications: {},
      dataVisAnnotating: {},
      drawing: {},
      feedback: {},
      fieldGuide: {},
      subjects: {},
      subjectViewer: {},
      tutorials: {},
      workflowSteps: {},
      userProjectPreferences: {}
    }, { client: clientStub, authClient: { checkBearerToken: () => Promise.resolve(), checkCurrent: () => Promise.resolve() } })

    store.projects.setResources([project])
    store.projects.setActive(project.id)
    return store
  }

  it('should exist', function () {
    expect(WorkflowStore).to.be.an('object')
  })

  describe('workflow selection', function () {
    xdescribe('when there is a url query param', function () {
      before(function () {
        const panoptesClientStub = stubPanoptesJs({
          projects: projectWithoutDefault,
          subjects: Factory.buildList('subject', 10),
          workflows: workflow
        })

        rootStore = setupStores(panoptesClientStub, projectWithoutDefault)
        // JSDOM doesn't support doing this :(
        window.location.assign(`https://www.zooniverse.org/projects/${projectWithoutDefault.slug}/classify/?workflow=${workflow.id}`)
      })

      after(function () {
        rootStore = null
        window.location.assign('https://example.org/')
      })

      xit('should set the active workflow from the query param', function () {
      })
    })

    describe('when there is a project default', function () {
      let rootStore
      before(function () {
        const panoptesClientStub = stubPanoptesJs({
          subjects: Factory.buildList('subject', 10),
          workflows: workflow
        })

        rootStore = setupStores(panoptesClientStub, projectWithDefault)
      })

      after(function () {
        rootStore = null
      })

      it('should set the active workflow to the project.configuration.default_workflow', function () {
        expect(rootStore.workflows.active.id).to.equal(projectWithDefault.configuration.default_workflow)
      })
    })

    describe('when there is not an active project', function () {
      let rootStore
      before(function () {
        const panoptesClientStub = stubPanoptesJs({
          subjects: Factory.buildList('subject', 10),
          workflows: workflow
        })

        rootStore = setupStores(panoptesClientStub, projectWithoutDefault)
      })

      after(function () {
        rootStore = null
      })

      it('should set the active workflow to a random active workflow', function () {
        expect(projectWithoutDefault.configuration.default_workflow).to.be.undefined()
        expect(projectWithoutDefault.links.active_workflows.includes(rootStore.workflows.active.id)).to.be.true()
      })
    })
  })
})
