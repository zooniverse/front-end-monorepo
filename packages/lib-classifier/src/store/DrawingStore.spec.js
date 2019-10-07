import RootStore from './RootStore'
import {
  DrawingTaskFactory,
  ProjectFactory,
  SingleChoiceTaskFactory,
  WorkflowFactory
} from '../../test/factories'
import { Factory } from 'rosie'
import stubPanoptesJs from '../../test/stubPanoptesJs'

import DrawingStore from './DrawingStore'

function setupStores (clientStub, project, workflow) {
  const store = RootStore.create({
    classifications: {},
    dataVisAnnotating: {},
    drawing: {},
    feedback: {},
    fieldGuide: {},
    subjects: {},
    subjectViewer: {},
    tutorials: {},
    userProjectPreferences: {}
  }, {
    client: clientStub,
    authClient: { checkBearerToken: () => Promise.resolve(), checkCurrent: () => Promise.resolve() }
  })

  store.projects.setResource(project)
  store.projects.setActive(project.id)
  if (workflow) {
    store.workflows.setResource(workflow)
    store.workflows.setActive(workflow.id)
  }

  return store
}

describe('Model > DrawingStore', function () {
  const model = DrawingStore.create()

  it('should exist', function () {
    expect(model).to.be.an('object')
  })

  it('should default the active tool index to the first tool in the tools array', function () {
    expect(model.activeDrawingTool).to.equal(0)
  })

  it('should have an `eventStream` observable', function () {
    expect(model.eventStream).to.be.ok()
    expect(model.eventStream.subscribe).to.be.a('function')
  })

  describe('Views > activeDrawingTask', function () {
    it('should return the active workflow step drawing task', function () {
      const drawingTask = DrawingTaskFactory.build()
      drawingTask.help = 'random help string'
      const workflow = WorkflowFactory.build({
        steps: [
          ['S1', { taskKeys: ['T9'] }]
        ],
        tasks: {
          T9: drawingTask
        }
      })
      const project = ProjectFactory.build({}, { activeWorkflowId: workflow.id })
      const panoptesClientStub = stubPanoptesJs({ projects: project, workflows: workflow })
      const rootStore = setupStores(panoptesClientStub, project, workflow)

      expect(rootStore.drawing.activeDrawingTask.help).to.eql('random help string')
      expect(rootStore.drawing.activeDrawingTask.taskKey).to.eql('T9')
    })
  })

  describe('Views > isDrawingInActiveWorkflowStep', function () {
    it('should return true if there is a drawing task in the active workflow step', function () {
      const workflow = WorkflowFactory.build({
        steps: [
          ['S1', { taskKeys: ['T1'] }]
        ],
        tasks: {
          T1: DrawingTaskFactory.build()
        }
      })
      const project = ProjectFactory.build({}, { activeWorkflowId: workflow.id })
      const panoptesClientStub = stubPanoptesJs({ projects: project, workflows: workflow })
      const rootStore = setupStores(panoptesClientStub, project, workflow)

      expect(rootStore.drawing.isDrawingInActiveWorkflowStep).to.be.true()
    })

    it('should return false if there is not a drawing task in the active workflow step', function () {
      const workflow = WorkflowFactory.build({
        steps: [
          ['S1', { taskKeys: ['T1'] }]
        ],
        tasks: {
          T1: SingleChoiceTaskFactory.build()
        }
      })
      const project = ProjectFactory.build({}, { activeWorkflowId: workflow.id })
      const panoptesClientStub = stubPanoptesJs({ projects: project, workflows: workflow })
      const rootStore = setupStores(panoptesClientStub, project, workflow)

      expect(rootStore.drawing.isDrawingInActiveWorkflowStep).to.be.false()
    })
  })

  describe('Views > coordinateStream', function () {
    describe('with an eventStream of client events pointerdown, pointermoves, and pointerup', function () {
      it('should return a coordinateStream view of the events converted to svg coordinates', function () {
        expect(true).to.be.false()
      })
    })
  })

  describe('Actions', function () {
    it('should set the active tool index', function () {
      model.setActiveDrawingTool(1)
      expect(model.activeDrawingTool).to.equal(1)
    })

    it('should reset the active tool to 0 when reset is called', function () {
      model.reset()
      expect(model.activeDrawingTool).to.equal(0)
    })

    it('should add new events to the eventStream with `addToStream`', function (done) {
      const newEvent = 'foo'
      model.eventStream.subscribe(value => {
        expect(value).to.equal(newEvent)
        done()
      })
      model.addToStream(newEvent)
    })
  })
})
