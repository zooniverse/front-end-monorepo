import { Subject } from 'rxjs'
import { TestScheduler } from 'rxjs/testing'
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

  // is the following after block necessary?
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

  it('should have an `eventStream` observable', function () {
    expect(model.eventStream).to.be.ok()
    expect(model.eventStream.subscribe).to.be.a('function')
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

  describe('Views > coordinateStream', function () {
    beforeEach(function () {
      sinon.stub(model, 'getEventOffset').callsFake((x, y) => ({ x: (x + 100), y: (y + 100) }))
    })

    afterEach(function () {
      model.getEventOffset.restore()
      model.setEventStream(new Subject())
    })

    const events = '--a--b-c---d--|'
    const values = {
      a: { clientX: 50, clientY: 50, type: 'pointermove' },
      b: { clientX: 100, clientY: 200, type: 'pointerdown' },
      c: { clientX: 150, clientY: 250, type: 'pointermove' },
      d: { clientX: 200, clientY: 300, type: 'pointerup' }
    }

    const coordinateStreamEvents = '-----f-g---h--|'
    const coordinateStreamValues = {
      f: { x: 200, y: 300, type: 'pointerdown' },
      g: { x: 250, y: 350, type: 'pointermove' },
      h: { x: 300, y: 400, type: 'pointerup' }
    }

    it('should return a coordinateStream with events beginning on pointer down and converted from client to svg coordinates', function () {
      const testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).to.deep.equal(expected)
      })

      testScheduler.run(helpers => {
        const { hot, expectObservable } = helpers

        model.setEventStream(hot(events, values))

        expectObservable(model.coordinateStream).toBe(coordinateStreamEvents, coordinateStreamValues)
      })
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
