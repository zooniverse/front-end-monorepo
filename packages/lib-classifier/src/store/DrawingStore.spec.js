import sinon from 'sinon'

import RootStore from './RootStore'
import DrawingStore from './DrawingStore'

import {
  DrawingTaskFactory,
  ProjectFactory,
  SingleChoiceTaskFactory,
  WorkflowFactory
} from '../../test/factories'
import stubPanoptesJs from '../../test/stubPanoptesJs'

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
  let model
  let rootStore

  beforeEach(function () {
    model = DrawingStore.create()
    rootStore = null
  })

  after(function () {
    model = null
    rootStore = null
  })

  it('should exist', function () {
    expect(model).to.be.an('object')
  })

  it('should default the active tool index to the first tool in the tools array', function () {
    expect(model.activeDrawingToolIndex).to.equal(0)
  })

  describe('Views > activeDrawingTask', function () {
    it('should return the active workflow step drawing task', function () {
      const drawingTask = DrawingTaskFactory.build()
      drawingTask.help = 'test help string'
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
      rootStore = setupStores(panoptesClientStub, project, workflow)

      expect(rootStore.drawing.activeDrawingTask.help).to.eql('test help string')
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
      rootStore = setupStores(panoptesClientStub, project, workflow)

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
      rootStore = setupStores(panoptesClientStub, project, workflow)

      expect(rootStore.drawing.isDrawingInActiveWorkflowStep).to.be.false()
    })
  })

  describe('Volatile > eventStream', function () {
    it('should have an `eventStream` observable', function () {
      expect(model.eventStream).to.be.ok()
      expect(model.eventStream.subscribe).to.be.a('function')
    })
  })

  describe('Actions > addToStream', function () {
    beforeEach(function () {
      sinon.stub(model, 'getEventOffset').callsFake((x, y) => ({ x: (x + 100), y: (y + 100) }))
    })

    afterEach(function () {
      model.getEventOffset.restore()
    })

    it('should add events converted to SVG to the stream on calling `addToStream`', function (done) {
      const newEvent = { clientX: 100, clientY: 200, pointerId: 1, type: 'pointermove' }
      model.eventStream.subscribe(value => {
        expect(value.x).to.equal(200)
        expect(value.y).to.equal(300)
        expect(value.pointerId).to.equal(1)
        expect(value.type).to.equal('pointermove')
        done()
      })
      model.addToStream(newEvent)
    })
  })

  describe('Actions', function () {
    it('should set the active tool index', function () {
      model.setActiveDrawingTool(1)
      expect(model.activeDrawingToolIndex).to.equal(1)
    })

    it('should reset the active tool to 0 when reset is called', function () {
      model.reset()
      expect(model.activeDrawingToolIndex).to.equal(0)
    })
  })
})
