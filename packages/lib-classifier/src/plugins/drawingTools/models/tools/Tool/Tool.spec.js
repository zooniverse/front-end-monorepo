import { getSnapshot } from 'mobx-state-tree'
import sinon from 'sinon'
import { Tool } from '@plugins/drawingTools/models/tools'

describe('Model > DrawingTools > Tool', function () {
  const toolData = {
    color: '#ff0000',
    label: 'Point',
    max: '10',
    min: 1,
    type: 'default'
  }

  it('should exist', function () {
    const tool = Tool.create(toolData)
    expect(tool).to.exist
    expect(Object.keys(tool).length).not.to.equal(0)
  })

  it('should load tool details from a snapshot', function () {
    const details = [
      {
        type: 'multiple',
        answers: ['apples', 'oranges', 'pears'],
        required: '',
        strings: {
          question: 'which fruit?'
        }
      },
      {
        type: 'single',
        answers: ['one', 'two', 'three'],
        required: '',
        strings: {
          question: 'how many?'
        }
      },
      {
        type: 'text',
        required: '',
        strings: {
          instruction: 'Transcribe something'
        }
      },
      // NOTE: the following represents a legacy dropdown task
      {
        type: 'dropdown',
        required: false,
        selects: [
          {
            allowCreate: false,
            id: '1',
            options: {
              '*': [
                { label: 'carrot', value: 'carrot' },
                { label: 'potato', value: 'potato' },
                { label: 'turnip', value: 'turnip' },
                { label: 'parsnip', value: 'parsnip' }
              ]
            },
            required: false
          }
        ],
        strings: {
          instruction: 'select a vegetable'
        }
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

    describe('with valid subtasks', function () {
      let simpleDropdownTaskSnapshot
      let multipleTaskSnapshot
      let singleTaskSnapshot
      let textTaskSnapshot
      let tool

      before(function () {
        const tasks = [
          {
            taskKey: 'multiple',
            type: 'multiple',
            answers: ['apples', 'oranges', 'pears'],
            required: '',
            strings: {
              question: 'which fruit?'
            }
          },
          {
            taskKey: 'single',
            type: 'single',
            answers: ['one', 'two', 'three'],
            required: '',
            strings: {
              question: 'how many?'
            }
          },
          {
            taskKey: 'text',
            type: 'text',
            required: '',
            strings: {
              instruction: 'Transcribe something'
            },
            text_tags: []
          },
          // NOTE: the following represents a legacy dropdown task converted to the simple dropdown task, see tasks/dropdown-simple/README for additional details
          {
            taskKey: 'dropdown',
            type: 'dropdown-simple',
            allowCreate: false,
            options: [
              'carrot',
              'potato',
              'turnip',
              'parsnip'
            ],
            required: false,
            strings: {
              instruction: 'select a vegetable'
            }
          },
        ]
        tool = Tool.create(toolData)
        multipleTaskSnapshot = tasks[0]
        singleTaskSnapshot = tasks[1]
        textTaskSnapshot = tasks[2]
        simpleDropdownTaskSnapshot = tasks[3]
        tool.createTask(multipleTaskSnapshot)
        tool.createTask(singleTaskSnapshot)
        tool.createTask(textTaskSnapshot)
        tool.createTask(simpleDropdownTaskSnapshot)
      })

      it('should create multiple choice tasks', function () {
        const {annotation, ...snapshot} = getSnapshot(tool.tasks[0])
        expect(snapshot).to.deep.equal(multipleTaskSnapshot)
      })

      it('should create single choice tasks', function () {
        const {annotation, ...snapshot} = getSnapshot(tool.tasks[1])
        expect(snapshot).to.deep.equal(singleTaskSnapshot)
      })

      it('should create text tasks', function () {
        const {annotation, ...snapshot} = getSnapshot(tool.tasks[2])
        expect(snapshot).to.deep.equal(textTaskSnapshot)
      })

      it('should create dropdown tasks', function () {
        const {annotation, ...snapshot} = getSnapshot(tool.tasks[3])
        expect(snapshot).to.deep.equal(simpleDropdownTaskSnapshot)
      })
    })

    describe('with invalid subtasks', function () {
      let consoleStub
      let tool

      before(function () {
        consoleStub = sinon.stub(console, 'error')
        const tasks = [
          {
            taskKey: 'drawing',
            type: 'drawing',
            strings: {
              question: 'which fruit?'
            },
            tools: []
          }
        ]
        tool = Tool.create(toolData)
        const drawingTaskSnapshot = tasks[0]
        const drawingTask = tool.createTask(drawingTaskSnapshot)
      })

      after(function () {
        consoleStub.restore()
      })

      it('should not create subtasks', function () {
        expect(tool.tasks.length).to.equal(0)
      })

      it('should error', function () {
        sinon.assert.calledOnceWithExactly(consoleStub, 'drawing is not a valid drawing subtask')
      })
    })
  })

  describe('tool.deleteMark', function () {
    it('should remove a mark', function () {
      const mark = { id: '1' }
      const tool = Tool.create(toolData)
      tool.createMark(mark)
      tool.deleteMark(mark)
      expect(tool.marks.size).to.equal(0) // tool.marks is a mobx Map
    })
  })

  describe('with fewer than the minimum marks', function () {
    let tool

    before(function () {
      tool = Tool.create(toolData)
    })

    it('should be incomplete', function () {
      expect(tool.isComplete).to.equal(false)
    })

    it('should not be disabled', function () {
      expect(tool.disabled).to.equal(false)
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
      expect(tool.isComplete).to.equal(true)
    })

    it('should not be disabled', function () {
      expect(tool.disabled).to.equal(false)
    })
  })

  describe('with the maximum marks', function () {
    it('should be disabled', function () {
      const tool = Tool.create(toolData)
      const ids = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
      ids.forEach(id => tool.createMark({ id }))
      expect(tool.disabled).to.equal(true)
    })
  })

  describe('validation', function () {
    let tool
    before(function () {
      tool = Tool.create(toolData)
      tool.createMark({ id: '1' })
      tool.createMark({ id: '2' })
    })

    it('should compute a reduced validity for all marks belonging to the tool', function () {
      expect(tool.isValid).to.equal(true)
    })

    it('should delete invalid marks', function () {
      // Generic marks default to always be valid
      expect(tool.marks.size).to.equal(2)
      tool.validate()
      expect(tool.marks.size).to.equal(2)
    })
  })
})
