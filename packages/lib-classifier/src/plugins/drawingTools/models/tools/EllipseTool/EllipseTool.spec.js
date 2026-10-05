import { EllipseTool } from '@plugins/drawingTools/models/tools'

const ellipse = {
  color: '#ff0000',
  label: 'An Ellipse',
  max: 2,
  min: 1,
  type: 'ellipse'
}

describe('Model > DrawingTools > Ellipse', function () {
  // Replays the pointer sequence InteractionLayer runs while creating a mark.
  function drawMark(tool, { from, to }) {
    const mark = tool.createMark({ id: `ellipse${tool.marks.size}` })
    mark.initialPosition(from)
    tool.handlePointerMove(to, mark)
    tool.handlePointerUp(to, mark)
    return mark
  }

  it('should exist', function () {
    const ellipseToolInstance = EllipseTool.create(ellipse)
    expect(ellipseToolInstance).to.exist
    expect(ellipseToolInstance).to.be.an('object')
  })

  it('should have a property `type` of `ellipse`', function () {
    const ellipseToolInstance = EllipseTool.create(ellipse)
    expect(ellipseToolInstance).to.deep.include({ type: 'ellipse' })
  })

  it('should throw an error with incorrect property `type`', function () {
    expect(() => EllipseTool.create({ type: 'oblong' })).to.throw()
  })

  describe('drawing a mark', function () {
    let tool
    let mark

    before(function () {
      tool = EllipseTool.create(ellipse)
      mark = drawMark(tool, {
        from: { x: 100, y: 100 },
        to: { x: 140, y: 100 }
      })
    })

    it('should set the centre from the pointer down', function () {
      expect(mark.x_center).to.equal(100)
      expect(mark.y_center).to.equal(100)
    })

    it('should set rx from the drag distance', function () {
      expect(mark.rx).to.equal(40)
    })

    it('should squash ry to a tenth of rx', function () {
      expect(mark.ry).to.equal(4)
    })

    it('should finish on pointer up', function () {
      expect(mark.finished).to.equal(true)
    })

    it('should be valid', function () {
      expect(mark.isValid).to.equal(true)
    })
  })

  it('should create a second mark from a second pointer sequence', function () {
    const tool = EllipseTool.create(ellipse)
    drawMark(tool, { from: { x: 100, y: 100 }, to: { x: 140, y: 100 } })
    drawMark(tool, { from: { x: 300, y: 300 }, to: { x: 300, y: 240 } })
    expect(tool.marks.size).to.equal(2)
    tool.marks.forEach(mark => expect(mark.finished).to.equal(true))
  })

  it('should delete a mark drawn smaller than the minimum radius', function () {
    const tool = EllipseTool.create(ellipse)
    drawMark(tool, { from: { x: 100, y: 100 }, to: { x: 102, y: 100 } })
    expect(tool.marks.size).to.equal(0)
  })

  it('should keep rx, ry and angle editable after the mark is finished', function () {
    const tool = EllipseTool.create(ellipse)
    const mark = drawMark(tool, {
      from: { x: 100, y: 100 },
      to: { x: 140, y: 100 }
    })
    mark.setCoordinates({ x: 100, y: 100, rx: 60, ry: 30, angle: 45 })
    expect(mark.rx).to.equal(60)
    expect(mark.ry).to.equal(30)
    expect(mark.angle).to.equal(45)
  })
})
