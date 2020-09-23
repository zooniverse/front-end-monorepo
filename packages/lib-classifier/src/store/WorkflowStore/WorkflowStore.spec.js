import { Factory } from 'rosie'
import RootStore from '../RootStore'
import Workflow from '../Workflow'
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

    describe('when there is a project default', function () {
      let rootStore
      before(async function () {
        const panoptesClientStub = stubPanoptesJs({
          subjects: Factory.buildList('subject', 10),
          workflows: workflow
        })

        rootStore = setupStores(panoptesClientStub, projectWithDefault)
        await rootStore.workflows.selectWorkflow()
      })

      after(function () {
        rootStore = null
      })

      it('should set the active workflow to the project.configuration.default_workflow', function () {
        expect(rootStore.workflows.active.id).to.equal(projectWithDefault.configuration.default_workflow)
      })
    })

    describe('when there is no default workflow', function () {
      let rootStore
      before(async function () {
        const panoptesClientStub = stubPanoptesJs({
          subjects: Factory.buildList('subject', 10),
          workflows: workflow
        })

        rootStore = setupStores(panoptesClientStub, projectWithoutDefault)
        await rootStore.workflows.selectWorkflow()
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

  describe('Actions > selectWorkflow', function () {
    describe('with a valid workflow ID', function () {
      let rootStore
      let workflowID

      before(async function () {
        workflowID = workflow.id
        const panoptesClientStub = stubPanoptesJs({
          subjects: Factory.buildList('subject', 10),
          workflows: [workflow]
        })

        rootStore = setupStores(panoptesClientStub, projectWithoutDefault)
        rootStore.workflows.reset()
        rootStore.workflows.setResources([workflow])
        await rootStore.workflows.selectWorkflow(workflowID)
      })

      after(function () {
        rootStore = null
      })

      it('should set the active workflow', function () {
        expect(rootStore.workflows.active.id).to.equal(workflowID)
      })

      it('should not have an active subject set', function () {
        const workflow = rootStore.workflows.active
        expect(workflow.subjectSetId).to.be.undefined()
      })
    })

    describe('with a valid workflow and subject set', function () {
      let rootStore
      let subjectSetID
      let workflowID

      before(async function () {
        const subjectSets = Factory.buildList('subject_set', 5)
        const subjectSetMap = {}
        subjectSets.forEach(subjectSet => {
          subjectSetMap[subjectSet.id] = subjectSet
        })
        const workflowSnapshot = WorkflowFactory.build({
          id: workflow.id,
          display_name: 'A test workflow',
          links: {
            subject_sets: Object.keys(subjectSetMap)
          },
          subjectSets: {
            resources: subjectSetMap
          },
          version: '0.0'
        })
        const workflowWithSubjectSets = Workflow.create(workflowSnapshot)
        workflowID = workflowWithSubjectSets.id
        subjectSetID = workflowWithSubjectSets.links.subject_sets[1]
        const panoptesClientStub = stubPanoptesJs({
          subjects: Factory.buildList('subject', 10),
          workflows: [workflowWithSubjectSets]
        })

        rootStore = setupStores(panoptesClientStub, projectWithoutDefault)
        rootStore.workflows.reset()
        rootStore.workflows.setResources([workflowWithSubjectSets])
        await rootStore.workflows.selectWorkflow(workflowID, subjectSetID)
      })

      after(function () {
        rootStore = null
      })

      it('should set the active workflow', function () {
        expect(rootStore.workflows.active.id).to.equal(workflowID)
      })

      it('should set the active subject set', function () {
        expect(rootStore.workflows.active.subjectSetId).to.equal(subjectSetID)
      })
    })

    describe('with an invalid workflow ID', function () {
      let rootStore

      before(function () {
        const workflows = Factory.buildList('workflow', 5)
        const panoptesClientStub = stubPanoptesJs({
          subjects: Factory.buildList('subject', 10),
          workflows: []
        })

        rootStore = setupStores(panoptesClientStub, projectWithoutDefault)
        rootStore.workflows.reset()
      })

      after(function () {
        rootStore = null
      })

      it('should throw an error', async function () {
        let errorThrown = false
        try {
          await rootStore.workflows.selectWorkflow('101')
        } catch (e) {
          expect(e.message).to.equal(`unable to load workflow 101 for project ${projectWithoutDefault.id}`)
          errorThrown = true
        }
        expect(errorThrown).to.be.true()
      })
    })
  })
})
