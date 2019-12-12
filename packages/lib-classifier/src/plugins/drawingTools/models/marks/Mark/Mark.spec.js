import Mark from './Mark'
import { Tool } from '@plugins/drawingTools/models/tools'

describe('Models > Drawing Task > Mark', function () {
  let mark

  before(function () {
    mark = Mark.create({ id: 'test', toolType: 'default' })
  })

  it('should exist', function () {
    expect(mark).to.be.ok()
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
    expect(mark.annotations).to.be.ok()
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
    const toolData = {
      color: '#ff0000',
      label: 'Point',
      max: '10',
      min: 1
    }

    describe('with incomplete, optional tasks', function () {
      before(function () {
        const details = [
          {
            type: 'multiple',
            question: 'which fruit?',
            answers: ['apples', 'oranges', 'pears'],
            required: false
          },
          {
            type: 'single',
            question: 'how many?',
            answers: ['one', 'two', 'three'],
            required: false
          }
        ]
        const drawingTool = Tool.create(Object.assign({}, toolData, { details }))
        const multipleTaskSnapshot = Object.assign({}, drawingTool.details[0], { taskKey: 'multiple' })
        const singleTaskSnapshot = Object.assign({}, drawingTool.details[1], { taskKey: 'single' })
        const multipleTask = drawingTool.createTask(multipleTaskSnapshot)
        const singleTask = drawingTool.createTask(singleTaskSnapshot)
        mark = drawingTool.createMark({ id: 'mockMark' })
      })

      it('should be complete', function () {
        expect(mark.isComplete).to.be.true()
      })
    })

    describe('with any incomplete, required tasks', function () {
      before(function () {
        const details = [
          {
            type: 'multiple',
            question: 'which fruit?',
            answers: ['apples', 'oranges', 'pears'],
            required: false
          },
          {
            type: 'single',
            question: 'how many?',
            answers: ['one', 'two', 'three'],
            required: true
          }
        ]
        const drawingTool = Tool.create(Object.assign({}, toolData, { details }))
        const multipleTaskSnapshot = Object.assign({}, drawingTool.details[0], { taskKey: 'multiple' })
        const singleTaskSnapshot = Object.assign({}, drawingTool.details[1], { taskKey: 'single' })
        const multipleTask = drawingTool.createTask(multipleTaskSnapshot)
        const singleTask = drawingTool.createTask(singleTaskSnapshot)
        mark = drawingTool.createMark({ id: 'mockMark' })
      })

      it('should be incomplete', function () {
        expect(mark.isComplete).to.be.false()
      })
    })

    describe('with only required tasks', function () {
      let mark
      let multipleTask
      let singleTask

      before(function () {
        const details = [
          {
            type: 'multiple',
            question: 'which fruit?',
            answers: ['apples', 'oranges', 'pears'],
            required: true
          },
          {
            type: 'single',
            question: 'how many?',
            answers: ['one', 'two', 'three'],
            required: true
          }
        ]
        const drawingTool = Tool.create(Object.assign({}, toolData, { details }))
        const multipleTaskSnapshot = Object.assign({}, drawingTool.details[0], { taskKey: 'multiple' })
        const singleTaskSnapshot = Object.assign({}, drawingTool.details[1], { taskKey: 'single' })
        multipleTask = drawingTool.createTask(multipleTaskSnapshot)
        singleTask = drawingTool.createTask(singleTaskSnapshot)
        mark = drawingTool.createMark({ id: 'mockMark' })
      })

      it('should be incomplete', function () {
        expect(mark.isComplete).to.be.false()
      })

      describe('after annotating task T1', function () {
        it('should still be incomplete', function () {
          mark.addAnnotation(multipleTask, [0])
          expect(mark.isComplete).to.be.false()
        })
      })

      describe('after annotating tasks T1 & T2', function () {
        it('should be complete', function () {
          mark.addAnnotation(singleTask, 1)
          expect(mark.isComplete).to.be.true()
        })
      })
    })
  })
})

