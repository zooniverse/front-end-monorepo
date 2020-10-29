import zooTheme from '@zooniverse/grommet-theme'
import sinon from 'sinon'
import { getSnapshot } from 'mobx-state-tree'
import Mark from './Mark'
import { Tool } from '@plugins/drawingTools/models/tools'
import RootStore from '@store'
import { DrawingTaskFactory, ProjectFactory, WorkflowFactory } from '@test/factories'
import stubPanoptesJs from '@test/stubPanoptesJs'
import { Factory } from 'rosie'

describe('Models > Drawing Task > Mark', function () {
  let mark

  function mockMark (options) {
    const defaultOptions = {
      required: ''
    }
    const { required } = options || defaultOptions
    const toolData = {
      color: '#ff0000',
      label: 'Point',
      max: '10',
      min: 1,
      type: 'default'
    }
    const tasks = [
      {
        taskKey: 'multiple',
        type: 'multiple',
        question: 'which fruit?',
        answers: ['apples', 'oranges', 'pears'],
        required
      },
      {
        taskKey: 'single',
        type: 'single',
        question: 'how many?',
        answers: ['one', 'two', 'three'],
        required
      }, {
        taskKey: 'text',
        type: 'text',
        instruction: 'Fill in the text',
      }
    ]
    const drawingTool = Tool.create(toolData)
    const multipleTaskSnapshot = tasks[0]
    const singleTaskSnapshot = tasks[1]
    const textTaskSnapshot = tasks[2]
    const multipleTask = drawingTool.createTask(multipleTaskSnapshot)
    const singleTask = drawingTool.createTask(singleTaskSnapshot)
    const textTask = drawingTool.createTask(textTaskSnapshot)
    const mark = drawingTool.createMark({ id: 'mockMark' })
    return { drawingTool, mark, multipleTask, singleTask, textTask }
  }

  before(function () {
    mark = Mark.create({ toolType: 'default' })
  })

  it('should exist', function () {
    expect(mark).to.be.ok()
  })

  it('should have an id', function () {
    expect(mark.id).to.exist()
    expect(mark.id).to.be.a('string')
  })

  it('should have a toolIndex', function () {
    expect(mark.toolIndex).to.equal(0)
  })

  it('should have a frame number', function () {
    expect(mark.frame).to.equal(0)
  })

  it('should be valid', function () {
    expect(mark.isValid).to.be.true()
  })

  it('should be able to store annotations', function () {
    expect(mark.annotations).to.be.a('map')
  })

  describe('getDistance', function () {
    it('should return the distance between two points', function () {
      expect(mark.getDistance(-20, -20, 20, 10)).to.equal(50)
    })
  })

  describe('getAngle', function () {
    it('should work at -90 degrees', function () {
      expect(mark.getAngle(-20, -20, -20, -40)).to.equal(-90)
    })

    it('should work at 0 degrees', function () {
      expect(mark.getAngle(-20, -20, 20, -20)).to.equal(0)
    })

    it('should work at 90 degrees', function () {
      expect(mark.getAngle(-20, -20, -20, 20)).to.equal(90)
    })

    it('should work at 180 degrees', function () {
      expect(mark.getAngle(-20, -20, -40, -20)).to.equal(180)
    })
  })

  describe('when there are no tool subtasks', function () {
    it('should not show the UI', function () {
      const pointTool = Tool.create({
        color: '#ff0000',
        label: 'Point',
        max: '10',
        min: 1,
        type: 'default'
      })
      const mark = pointTool.createMark({ id: 'mark1' })
      expect(mark.subTaskMarkBounds).to.be.undefined()
      expect(mark.subTaskVisibility).to.be.false()
      mark.setSubTaskVisibility(true)
      expect(mark.subTaskMarkBounds).to.be.undefined()
      expect(mark.subTaskVisibility).to.be.false()
    })
  })

  describe('with subtasks', function () {
    let mark

    describe('with incomplete, optional tasks', function () {
      let drawingTool

      before(function () {
        ({ drawingTool, mark } = mockMark())
      })

      it('should be complete', function () {
        expect(mark.isComplete).to.be.true()
      })

      it('should complete the drawing tool', function () {
        expect(drawingTool.isComplete).to.be.true()
      })
    })

    describe('with any incomplete, required tasks', function () {
      let drawingTool

      before(function () {
        ({ drawingTool, mark } = mockMark({ required: 'true' }))
      })

      it('should be incomplete', function () {
        expect(mark.isComplete).to.be.false()
      })

      it('should not complete the drawing tool', function () {
        expect(drawingTool.isComplete).to.be.false()
      })
    })

    describe('with only required tasks', function () {
      let drawingTool
      let mark
      let multipleTask
      let singleTask

      before(function () {
        ({ drawingTool, mark, multipleTask, singleTask } = mockMark({ required: 'true' }))
      })

      it('should be incomplete', function () {
        expect(mark.isComplete).to.be.false()
      })

      it('should not complete the drawing tool', function () {
        expect(drawingTool.isComplete).to.be.false()
      })

      describe('after annotating the first subtask', function () {
        it('should still be incomplete', function () {
          mark.addAnnotation(multipleTask, [0])
          expect(mark.isComplete).to.be.false()
        })

        it('should not complete the drawing tool', function () {
          expect(drawingTool.isComplete).to.be.false()
        })
      })

      describe('after annotating both subtasks', function () {
        it('should be complete', function () {
          mark.addAnnotation(singleTask, 1)
          expect(mark.isComplete).to.be.true()
        })

        it('should complete the drawing tool', function () {
          expect(drawingTool.isComplete).to.be.true()
        })
      })
    })

    describe('visibility', function () {
      before(function () {
        ({ mark } = mockMark())
      })

      it('should toggle the visibility of the UI', function () {
        expect(mark.subTaskVisibility).to.be.false()
        mark.setSubTaskVisibility(true)
        expect(mark.subTaskVisibility).to.be.true()
        mark.setSubTaskVisibility(false)
        expect(mark.subTaskVisibility).to.be.false()
      })

      it('should store the DOM node bounds if a reference is passed as a parameter', function () {
        const node = document.createElement('g')
        expect(mark.subTaskMarkBounds).to.be.undefined()
        mark.setSubTaskVisibility(true, node)
        expect(mark.subTaskMarkBounds).to.be.an('object')
        mark.setSubTaskVisibility(false)
        expect(mark.subTaskMarkBounds).to.be.undefined()
      })

      it('should store the previous annotation values if passed as a parameter', function () {
        const node = document.createElement('g')
        const previousAnnotationValues = [
          {
            taskKey: 'T0.0.0',
            taskType: 'text',
            values: [
              'Hello',
              'Hello'
            ]
          },
          {
            taskKey: 'T0.0.1',
            taskType: 'text',
            values: [
              'World',
              'World'
            ]
          }
        ]
        expect(mark.subTaskPreviousAnnotationValues.size).to.equal(0)
        mark.setSubTaskVisibility(true, node, previousAnnotationValues)
        expect(mark.subTaskPreviousAnnotationValues.size).to.equal(previousAnnotationValues.length)
        expect(mark.subTaskPreviousAnnotationValues.get(previousAnnotationValues[0].taskKey)).to.deep.equal(previousAnnotationValues[0])
        expect(mark.subTaskPreviousAnnotationValues.get(previousAnnotationValues[1].taskKey)).to.deep.equal(previousAnnotationValues[1])
        mark.setSubTaskVisibility(false)
        expect(mark.subTaskPreviousAnnotationValues.size).to.equal(0)
      })
    })
  })

  describe('snapshots', function () {
    let multipleChoiceAnnotation
    let singleChoiceAnnotation
    let snapshot

    before(function () {
      const { mark, multipleTask, singleTask } = mockMark()
      singleChoiceAnnotation = mark.addAnnotation(singleTask, 1)
      multipleChoiceAnnotation = mark.addAnnotation(multipleTask, [0, 2])
      snapshot = getSnapshot(mark)
    })

    it('should not have an ID', function () {
      expect(snapshot.id).to.be.undefined()
    })

    it('should have an annotations array', function () {
      expect(snapshot.annotations).to.deep.equal([
        singleChoiceAnnotation.toSnapshot(),
        multipleChoiceAnnotation.toSnapshot()
      ])
    })
  })

  describe('when multiple frame subjects', function () {
    let rootStore
    before(function () {
      const project = ProjectFactory.build()
      const workflow = WorkflowFactory.build()
      const subjects = Factory.buildList('subject', 10)
      const drawingTaskSnapshot = DrawingTaskFactory.build({
        instruction: 'Draw a point',
        taskKey: 'T1',
        tools: [{
          color: zooTheme.global.colors['drawing-red'],
          type: 'point'
        }],
        type: 'drawing'
      })
      workflow.tasks = [drawingTaskSnapshot]
      const client = stubPanoptesJs({
        subjects,
        workflows: [workflow]
      })
      client.tutorials = {
        get: sinon.stub().callsFake(() => Promise.resolve({ body: { tutorials: [] } }))
      }

      rootStore = RootStore.create({}, {
        authClient: { checkBearerToken: () => Promise.resolve(), checkCurrent: () => Promise.resolve() },
        client
      })
      rootStore.projects.setResources([project])
      rootStore.projects.setActive(project.id)
      rootStore.workflows.setResources([workflow])
      rootStore.workflows.setActive(workflow.id)
      rootStore.subjects.setResources(subjects)
      rootStore.subjects.advance()

      rootStore.workflowSteps.activeStepTasks[0].setActiveTool(0)
    })

    it('should store the correct frame for the mark', function () {
      const initialFrame = rootStore.subjectViewer.frame // defaults to 0
      const point1 = rootStore.workflowSteps.activeStepTasks[0].activeTool.createMark({
        id: '1',
        frame: initialFrame,
        toolIndex: 0
      })
      expect(point1.frame).to.equal(initialFrame)
      expect(initialFrame).to.equal(0)
      rootStore.subjectViewer.setFrame(1)
      const nextFrame = rootStore.subjectViewer.frame
      const point2 = rootStore.workflowSteps.activeStepTasks[0].activeTool.createMark({
        id: '2',
        frame: nextFrame,
        toolIndex: 0
      })
      expect(point2.frame).to.equal(nextFrame)
      expect(nextFrame).to.equal(1)
    })
  })
})

