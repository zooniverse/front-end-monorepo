import React from 'react'
import { shallow } from 'enzyme'
import TranscriptionLineTool from './TranscriptionLineTool'
import { TranscriptionLine } from '@plugins/drawingTools/models/marks'

const toolData = {
  color: '#ff0000',
  type: 'transcriptionLine'
}

describe('Model > TranscriptionLineTool', function () {
  let tool

  beforeEach(function () {
    tool = TranscriptionLineTool.create(toolData)
  })

  it('should exist', function () {
    expect(tool).to.exist()
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
        expect(mark.finished).to.be.true()
      })
    })
  })
})
