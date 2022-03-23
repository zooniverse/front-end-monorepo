import React from 'react'
import { mount, shallow } from 'enzyme'
import sinon from 'sinon'
import { PointTool, LineTool } from '@plugins/drawingTools/models/tools'
import { Mark } from '@plugins/drawingTools/components'
import SVGContext from '@plugins/drawingTools/shared/SVGContext'
import DrawingToolMarks from './DrawingToolMarks'

describe('Components > DrawingToolMarks', function () {
  let mockContext
  let canvas
  let line
  let point
  let marks

  beforeEach(function () {
    canvas = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    const svgBounds = { left: 0, top: 0, right: 2000, bottom: 1000, width: 2000, height: 1000 }
    sinon.stub(canvas, 'getBoundingClientRect').callsFake(() => svgBounds)
    const lineTool = LineTool.create({
      help: '',
      label: 'Draw a line',
      type: 'line'
    })
    const pointTool = PointTool.create({
      help: '',
      label: 'Points!',
      type: 'point'
    })
    line = lineTool.createMark({ id: 'line1' })
    point = pointTool.createMark({ id: 'point1' })
    marks = [ line, point ]
    mockContext = { canvas }
  })

  it('should render without crashing', function () {
    const wrapper = shallow(<DrawingToolMarks marks={marks} />)
    expect(wrapper).to.be.ok()
  })

  it('should render a line', function () {
    const wrapper = shallow(<DrawingToolMarks marks={marks} />)
    const Line = line.toolComponent
    expect(wrapper.find(Line).prop('mark')).to.equal(line)
  })

  it('should render a point', function () {
    const wrapper = shallow(<DrawingToolMarks marks={marks} />)
    const Point = point.toolComponent
    expect(wrapper.find(Point).prop('mark')).to.equal(point)
  })

  describe('with an active mark', function () {
    it('should show that mark as active', function () {
      const wrapper = shallow(<DrawingToolMarks activeMark={{ id: 'point1' }} marks={marks} />)
      const Point = point.toolComponent
      expect(wrapper.find(Point).prop('active')).to.be.true()
    })

    it('should render a delete button', function () {
      const wrapper = shallow(<DrawingToolMarks activeMark={{ id: 'point1' }} marks={marks} />)
      expect(wrapper.find({ label: 'Delete point' }).prop('mark')).to.equal(point)
    })
  })

  describe('when a mark is moved to a new position', function () {
    let dragEnd
    let onDeselectMark
    let onDelete
    let onFinish

    beforeEach(function () {
      const point = marks[1]
      onDeselectMark = sinon.stub()
      onDelete = sinon.stub()
      onFinish = sinon.stub()
      const wrapper = mount(
        <SVGContext.Provider value={mockContext}>
          <svg>
            <DrawingToolMarks
              onDelete={onDelete}
              onDeselectMark={onDeselectMark}
              onFinish={onFinish}
              marks={marks}
            />
          </svg>
        </SVGContext.Provider>
      )
      dragEnd = wrapper.find(Mark).at(1).prop('dragEnd')
    })

    afterEach(function () {
      onFinish.resetHistory()
    })

    describe('when the mark is inside the SVG element', function () {
      it('should call onFinish, not onDelete', function () {
        const mockBounds = { left: 0, top: 0, right: 100, bottom: 100, width: 100, height: 100 }
        const currentTarget = {
          getBoundingClientRect: () => mockBounds
        }
        const fakeEvent = { currentTarget }
        dragEnd(fakeEvent)
        const { tool } = marks[1]
        expect(tool.marks.size).to.equal(1)
        expect(onFinish).to.have.been.calledOnce()
        expect(onDelete).to.not.have.been.called()
      })
    })

    describe('when the mark overlaps the SVG element', function () {
      it('should call onFinish, not onDelete', function () {
        const mockBounds = { left: 1990, top: 20, right: 2090, bottom: 120, width: 100, height: 100 }
        const currentTarget = {
          getBoundingClientRect: () => mockBounds
        }
        const fakeEvent = { currentTarget }
        dragEnd(fakeEvent)
        const { tool } = marks[1]
        expect(tool.marks.size).to.equal(1)
        expect(onFinish).to.have.been.calledOnce()
        expect(onDelete).to.not.have.been.called()
      })
    })

    describe('when the mark is outside the SVG element', function () {
      it('should delete the mark', function () {
        const mockBounds = { left: 2090, top: 20, right: 2190, bottom: 120, width: 100, height: 100 }
        const currentTarget = {
          getBoundingClientRect: () => mockBounds
        }
        const fakeEvent = { currentTarget }
        dragEnd(fakeEvent)
        const { tool } = marks[1]
        expect(onDelete).to.have.been.calledOnce()
        expect(tool.marks).to.be.empty()
      })
    })
  })
})
