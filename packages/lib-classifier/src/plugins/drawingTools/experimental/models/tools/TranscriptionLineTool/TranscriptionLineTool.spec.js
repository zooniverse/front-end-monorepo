import TranscriptionLineTool from './TranscriptionLineTool'

describe('Model > TranscriptionLineTool', function () {
  let tool
  const toolData = {
    color: '#ff0000',
    type: 'transcriptionLine'
  }

  beforeEach(function () {
    tool = TranscriptionLineTool.create(toolData)
  })

  it('should exist', function () {
    expect(tool).to.exist
    expect(tool).to.be.an('object')
  })

  describe('actions', function () {
    describe('createMark', function () {
      it('should create a mark', function () {
        const firstMark = { x: 0, y: 0 }
        expect(tool.marks.size).to.equal(0)
        tool.createMark(firstMark)
        expect(tool.marks.size).to.equal(1)
      })
    })

    describe('handlePointerDown', function () {
      it('should finish the previous mark', function () {
        const pointerEvent = { x: 10, y: 10 }
        const mark = tool.createMark({ x: 0, y: 0 })
        tool.handlePointerDown(pointerEvent, mark)
        expect(tool.marks.size).to.equal(1)
        expect(mark.finished).to.equal(true)
      })
    })

    describe('validate', function () {
      it('should delete invalid marks', function () {
        // Validate action is from generic tool model
        // but only the transcription line tool has logic for invalid marks right now
        const mark = tool.createMark({ x: 0, y: 0 })
        tool.handlePointerDown({ x: 10, y: 10 }, mark)
        tool.createMark({ x: 15, y: 15 })
        expect(tool.marks.size).to.equal(2)
        tool.validate()
        expect(tool.marks.size).to.equal(1)
      })
    })
  })
})
