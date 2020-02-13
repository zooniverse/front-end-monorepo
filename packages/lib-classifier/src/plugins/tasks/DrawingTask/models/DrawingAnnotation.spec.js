import { types } from 'mobx-state-tree'
import DrawingTask from './DrawingTask'
import DrawingAnnotation from './DrawingAnnotation'
import { Point } from '@plugins/drawingTools/models/marks'

describe('Model > DrawingAnnotation', function () {
  const point = Point.create({ id: 'mockAnnotation', frame: 0, toolIndex: 0, toolType: 'point', x: 100, y: 150 })


  const drawingAnnotationSnapshot = {
    id: 'drawing1',
    task: 'T0',
    taskType: 'drawing',
    value: [ point.id ]
  }

  it('should exist', function () {
    const drawingAnnotation = DrawingAnnotation.create(drawingAnnotationSnapshot)
    expect(drawingAnnotation).to.exist()
    expect(drawingAnnotation).to.be.an('object')
  })

  describe('annotation snapshots', function () {

    function buildMockAnnotation ({ taskSnapshot }) {
      const drawingTask = DrawingTask.create(taskSnapshot)
      const annotation = drawingTask.createAnnotation()
      // TODO: build a more realistic model tree here.
      types.model('MockStore', {
        drawingTask: DrawingTask,
        annotation: DrawingAnnotation
      })
      .create({
        drawingTask,
        annotation
      })
      return { annotation, drawingTask }
    }

    describe('without subtasks', function () {
      let snapshot

      before(function () {
        const { annotation, drawingTask } = buildMockAnnotation({
          taskSnapshot: {
            instruction: 'draw things!',
            taskKey: 'T0',
            tools: [
              {
                type: 'point'
              }
            ],
            type: 'drawing'
          }
        })
        const pointTool = drawingTask.tools[0]
        pointTool.createMark({
          x: 50,
          y: 100
        })
        snapshot = annotation.toSnapshot()
      })

      it('should be an array', function () {
        expect(snapshot).to.be.a('array')
      })

      it('should contain exactly one annotation', function () {
        expect(snapshot).to.have.lengthOf(1)
      })

      describe('the annotation snapshot', function () {
        it('should contain a task key', function () {
          const [ annotation ] = snapshot
          expect(annotation.task).to.equal('T0')
        })

        it('should contain a taskType', function () {
          const [ annotation ] = snapshot
          expect(annotation.taskType).to.equal('drawing')
        })

        it('should include snapshots of the drawn marks', function () {
          const [ annotation ] = snapshot
          const pointSnapshot = {
            details: [],
            frame: 0,
            toolIndex: 0,
            toolType: 'point',
            x: 50,
            y: 100
          }
          expect(annotation.value).to.deep.equal([ pointSnapshot ])
        })
      })
    })

    describe('with subtasks', function () {
      let snapshot

      before(function () {
        const { annotation, drawingTask } = buildMockAnnotation({
          taskSnapshot: {
            instruction: 'draw things!',
            taskKey: 'T0',
            tools: [
              {
                type: 'point',
                details: [{
                  type: 'single',
                  question: 'Yes or no?',
                  answers: [ 'yes', 'no' ]
                }]
              }
            ],
            type: 'drawing'
          }
        })
        const pointTool = drawingTask.tools[0]
        const point1 = pointTool.createMark({
          x: 50,
          y: 100
        })
        const point2 = pointTool.createMark({
          x: 150,
          y: 200
        })
        const questionTask = pointTool.tasks[0]
        point1.addAnnotation(questionTask, 0)
        point2.addAnnotation(questionTask, 1)
        snapshot = annotation.toSnapshot()
      })

      it('should be an array', function () {
        expect(snapshot).to.be.a('array')
      })

      it('should contain the task annotation plus one annotation for each subtask', function () {
        expect(snapshot).to.have.lengthOf(3)
      })

      it('should contain snapshots of the annotation plus subtask answers', function () {
        const [ annotation ] = snapshot
        const point1Answer = {
          task: 'T0.0.0',
          taskType: 'single',
          value: 0,
          markIndex: 0
        }
        const point2Answer = {
          task: 'T0.0.0',
          taskType: 'single',
          value: 1,
          markIndex: 1
        }
        expect(snapshot).to.deep.equal([ annotation, point1Answer, point2Answer ])
      })

      describe('the annotation snapshot', function () {
        it('should contain a task key', function () {
          const [ annotation ] = snapshot
          expect(annotation.task).to.equal('T0')
        })

        it('should contain a taskType', function () {
          const [ annotation ] = snapshot
          expect(annotation.taskType).to.equal('drawing')
        })

        it('should include snapshots of the drawn marks', function () {
          const [ annotation ] = snapshot
          const point1Snapshot = {
            details: [{ task: 'T0.0.0' }],
            frame: 0,
            toolIndex: 0,
            toolType: 'point',
            x: 50,
            y: 100
          }
          const point2Snapshot = {
            details: [{ task: 'T0.0.0' }],
            frame: 0,
            toolIndex: 0,
            toolType: 'point',
            x: 150,
            y: 200
          }
          expect(annotation.value).to.deep.equal([ point1Snapshot, point2Snapshot ])
        })
      })
    })
  })
})
