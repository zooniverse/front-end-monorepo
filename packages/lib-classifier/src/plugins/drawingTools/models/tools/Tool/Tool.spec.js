import sinon from 'sinon'
import Tool from './Tool'

const toolData = {
  color: '#ff0000',
  label: 'Point',
  max: '10',
  min: 1,
  type: 'default'
}

describe('Model > DrawingTools > Tool', function () {
  it('should exist', function () {
    const tool = Tool.create(toolData)
    expect(tool).to.exist()
    expect(tool).to.be.an('object')
  })
  
  it('should load tool details from a snapshot', function () {
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
      },
      {
        type: 'text',
        instruction: 'Transcribe something',
        required: false
      }
    ]
    const tool = Tool.create(Object.assign({}, toolData, { details }))
    expect(tool.details).to.deep.equal(details)
  })
  
  describe('tool.createMark', function () {
    it('should add a new mark', function () {
      const mark = { id: '1' }
      const tool = Tool.create(toolData)
      tool.createMark(mark)
      expect(tool.marks.size).to.equal(1)
    })
  })

  describe('tool.createTask', function () {
    before(function () {
      sinon.stub(console, 'error')
    })

    after(function () {
      console.error.restore()
    })

    it('should create a new task for valid subtasks', function () {
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
        },
        {
          type: 'text',
          instruction: 'Transcribe something',
          required: false
        }
      ]
      const tool = Tool.create(Object.assign({}, toolData, { details }))
      const multipleTaskSnapshot = Object.assign({}, tool.details[0], {taskKey: 'multiple'})
      const singleTaskSnapshot = Object.assign({}, tool.details[1], {taskKey: 'single'})
      const textTaskSnapshot = Object.assign({}, tool.details[2], {taskKey: 'text'})
      const multipleTask = tool.createTask(multipleTaskSnapshot)
      const singleTask = tool.createTask(singleTaskSnapshot)
      const textTask = tool.createTask(singleTaskSnapshot)
      expect(tool.tasks[0]).to.equal(multipleTask)
      expect(tool.tasks[1]).to.equal(singleTask)
      expect(tool.tasks[2]).to.equal(textTask)
    })

    it('should error for invalid subtasks', function () {
      const details = [
        {
          type: 'drawing',
          question: 'which fruit?',
          tools: [],
          required: false
        }
      ]
      const tool = Tool.create(Object.assign({}, toolData, { details }))
      const drawingTaskSnapshot = Object.assign({}, tool.details[0], {taskKey: 'drawing'})
      const drawingTask = tool.createTask(drawingTaskSnapshot)
      expect(console.error.withArgs('drawing is not a valid drawing subtask')).to.have.been.calledOnce()
    })
  })

  describe('tool.deleteMark', function () {
    it('should remove a mark', function () {
      const mark = { id: '1' }
      const tool = Tool.create(toolData)
      tool.createMark(mark)
      tool.deleteMark(mark)
      expect(tool.marks).to.be.empty()
    })
  })

  describe('with fewer than the minimum marks', function () {
    let tool

    before(function () {
      tool = Tool.create(toolData)
    })

    it('should be incomplete', function () {
      expect(tool.isComplete).to.be.false()
    })

    it('should not be disabled', function () {
      expect(tool.disabled).to.be.false()
    })
  })

  describe('with the minimum marks but fewer than the maximum marks', function () {
    let tool

    before(function () {
      tool = Tool.create(toolData)
      const ids = ['1', '2']
      ids.forEach(id => tool.createMark({ id }))
    })

    it('should be complete', function () {
      expect(tool.isComplete).to.be.true()
    })

    it('should not be disabled', function () {
      expect(tool.disabled).to.be.false()
    })
  })

  describe('with the maximum marks', function () {
    it('should be disabled', function () {
      const tool = Tool.create(toolData)
      const ids = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
      ids.forEach(id => tool.createMark({ id }))
      expect(tool.disabled).to.be.true()
    })
  })
})
