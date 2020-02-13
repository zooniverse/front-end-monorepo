import { getSnapshot } from 'mobx-state-tree'
import Mark from './Mark'
import { Tool } from '@plugins/drawingTools/models/tools'

describe('Models > Drawing Task > Mark', function () {
  let mark

  function mockMark (options) {
    const defaultOptions = {
      required: false
    }
    const { required } = options || defaultOptions
    const toolData = {
      color: '#ff0000',
      label: 'Point',
      max: '10',
      min: 1,
      type: 'default'
    }
    const details = [
      {
        type: 'multiple',
        question: 'which fruit?',
        answers: ['apples', 'oranges', 'pears'],
        required
      },
      {
        type: 'single',
        question: 'how many?',
        answers: ['one', 'two', 'three'],
        required
      }
    ]
    const drawingTool = Tool.create(Object.assign({}, toolData, { details }))
    const multipleTaskSnapshot = Object.assign({}, drawingTool.details[0], { taskKey: 'multiple' })
    const singleTaskSnapshot = Object.assign({}, drawingTool.details[1], { taskKey: 'single' })
    const multipleTask = drawingTool.createTask(multipleTaskSnapshot)
    const singleTask = drawingTool.createTask(singleTaskSnapshot)
    const mark = drawingTool.createMark({ id: 'mockMark' })
    return { drawingTool, mark, multipleTask, singleTask }
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
        ({ drawingTool, mark } = mockMark({ required: true }))
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
        ({ drawingTool, mark, multipleTask, singleTask } = mockMark({ required: true }))
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
})

