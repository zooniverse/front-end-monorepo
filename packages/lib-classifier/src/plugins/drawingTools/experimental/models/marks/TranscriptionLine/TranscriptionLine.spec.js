import TranscriptionLineTool from '../../tools/TranscriptionLineTool'
import { TranscriptionLine as TranscriptionLineComponent } from '@plugins/drawingTools/components/'

describe('Models > Drawing Task > Marks > TranscriptionLine', function () {
  let mark

  function mockMark() {
    const toolData = {
      color: '#ff0000',
      label: 'Underline the transcription',
      max: '10',
      min: 1,
      type: 'transcriptionLine'
    }

    const tool = TranscriptionLineTool.create(toolData)
    const mark = tool.createMark({ id: 'mockMark' })
    return { tool, mark }
  }

  beforeEach(function () {
    ({ mark } = mockMark())
  })

  it('should exist', function () {
    expect(mark).to.exist
  })

  it('should have a TranscriptionLineTool parent', function () {
    expect(mark.tool.type).to.equal('transcriptionLine')
  })

  it('should have a TranscriptionLine component', function () {
    expect(mark.toolComponent).to.equal(TranscriptionLineComponent)
  })

  describe('when the mark is initially created', function () {
    let mark
    const coordinates = { x: 5, y: 10 }

    before(function () {
      ({ mark } = mockMark())
    })

    it('can set an initial position of the same point for x1, y1 and x2, y2', function () {
      mark.initialPosition(coordinates)
      expect(mark.x1).to.equal(coordinates.x)
      expect(mark.y1).to.equal(coordinates.y)
      expect(mark.x2).to.equal(coordinates.x)
      expect(mark.y2).to.equal(coordinates.y)
    })

    it('should not be finished', function () {
      expect(mark.finished).to.equal(false)
    })

    it('should not be valid', function () {
      expect(mark.isValid).to.equal(false)
    })
  })

  describe('when the initial position is set', function () {
    let mark, tool
    const pointOne = { x: 5, y: 10 }
    const pointTwo = { x: 15, y: 35 }
    before(function () {
      ({ mark, tool } = mockMark())
      mark.initialPosition(pointOne)
    })

    it('should position the delete button from the first point', function () {
      const { x, y } = mark.deleteButtonPosition(1)
      expect(x).to.be.a('number')
      expect(y).to.be.a('number')
    })

    it('should return the coordinates of the first point', function () {
      const { x, y } = mark.coords
      expect(x).to.equal(pointOne.x)
      expect(y).to.equal(pointOne.y)
    })

    it('can set the second point of the mark', function () {
      tool.handlePointerDown(pointTwo, mark)
      expect(mark.x2).to.equal(pointTwo.x)
      expect(mark.y2).to.equal(pointTwo.y)
    })
  })

  describe('when the second point is set', function () {
    let mark, tool
    const pointOne = { x: 5, y: 10 }
    const pointTwo = { x: 15, y: 35 }
    before(function () {
      ({ mark, tool } = mockMark())
      mark.initialPosition(pointOne)
      tool.handlePointerDown(pointTwo, mark)
    })

    it('is valid', function () {
      expect(mark.isValid).to.equal(true)
    })

    it('can be finished', function () {
      mark.finish()
      expect(mark.finished).to.equal(true)
    })

    it('has length', function () {
      const { length } = mark
      expect(length).to.be.a('number')
    })
  })

  describe('drag movement', function () {
    let mark, tool
    const pointOne = { x: 5, y: 10 }
    const pointTwo = { x: 15, y: 35 }
    before(function () {
      ({ mark, tool } = mockMark())
      mark.initialPosition(pointOne)
      tool.handlePointerDown(pointTwo, mark)
    })

    it('can move', function () {
      const diff = { x: 2, y: 4 }
      mark.move(diff)
      expect(mark.x1).to.equal(pointOne.x + diff.x)
      expect(mark.x2).to.equal(pointTwo.x + diff.x)
      expect(mark.y1).to.equal(pointOne.y + diff.y)
      expect(mark.y2).to.equal(pointTwo.y + diff.y)
    })

    it('can set both points\' coordinates', function () {
      const newCoordinates = { x1: 36, y1: 74, x2: 47, y2: 103 }
      mark.setCoordinates(newCoordinates)
      expect(mark.x1).to.equal(newCoordinates.x1)
      expect(mark.x2).to.equal(newCoordinates.x2)
      expect(mark.y1).to.equal(newCoordinates.y1)
      expect(mark.y2).to.equal(newCoordinates.y2)
    })
  })
})

