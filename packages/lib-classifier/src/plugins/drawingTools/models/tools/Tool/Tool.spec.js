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
        required: ''
      },
      {
        type: 'single',
        question: 'how many?',
        answers: ['one', 'two', 'three'],
        required: ''
      },
      {
        type: 'text',
        instruction: 'Transcribe something',
        required: ''
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

    describe('with valid subtasks', function () {
      let multipleTaskSnapshot
      let singleTaskSnapshot
      let textTaskSnapshot
      let tool

      before(function () {
        const tasks = [
          {
            taskKey: 'multiple',
            type: 'multiple',
            question: 'which fruit?',
            answers: ['apples', 'oranges', 'pears'],
            help: '',
            required: ''
          },
          {
            taskKey: 'single',
            type: 'single',
            question: 'how many?',
            answers: ['one', 'two', 'three'],
            help: '',
            required: ''
          },
          {
            taskKey: 'text',
            type: 'text',
            instruction: 'Transcribe something',
            help: '',
            required: '',
            text_tags: []
          }
        ]
        tool = Tool.create(toolData)
        multipleTaskSnapshot = tasks[0]
        singleTaskSnapshot = tasks[1]
        textTaskSnapshot = tasks[2]
        tool.createTask(multipleTaskSnapshot)
        tool.createTask(singleTaskSnapshot)
        tool.createTask(textTaskSnapshot)
      })

      it('should create multiple choice tasks', function () {
        const {annotation, ...snapshot} = tool.tasks[0]
        expect(snapshot).to.deep.equal(multipleTaskSnapshot)
      })

      it('should create single choice tasks', function () {
        const {annotation, ...snapshot} = tool.tasks[1]
        expect(snapshot).to.deep.equal(singleTaskSnapshot)
      })

      it('should create text tasks', function () {
        const {annotation, ...snapshot} = tool.tasks[2]
        expect(snapshot).to.deep.equal(textTaskSnapshot)
      })
    })

    it('should error for invalid subtasks', function () {
      const tasks = [
        {
          taskKey: 'drawing',
          type: 'drawing',
          question: 'which fruit?',
          tools: []
        }
      ]
      const tool = Tool.create(toolData)
      const drawingTaskSnapshot = tasks[0]
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
