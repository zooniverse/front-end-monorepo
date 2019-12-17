import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import { LineTool } from '@plugins/drawingTools/models/tools'
import { Line } from '@plugins/drawingTools/models/marks'
import { DrawingToolRoot } from '@plugins/drawingTools/components'
import DrawingToolMarks from './DrawingToolMarks'

describe('Components > DrawingToolMarks', function () {
  let svg
  let tool

  beforeEach(function () {
    svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
    const svgBounds = { left: 0, top: 0, right: 2000, bottom: 1000, width: 2000, height: 1000 }
    sinon.stub(svg, 'getBoundingClientRect').callsFake(() => svgBounds )
    const lineTool = LineTool.create({
      help: '',
      label: 'Draw a line',
      type: 'line'
    })
    lineTool.createMark({ id: 'line1' }),
    lineTool.createMark({ id: 'line2' }),
    tool = lineTool
  })

  it('should render without crashing', function () {
    const wrapper = shallow(<DrawingToolMarks tool={tool} svg={svg} />)
    expect(wrapper).to.be.ok()
  })
  
  it('should render two lines', function () {
    const wrapper = shallow(<DrawingToolMarks tool={tool} svg={svg} />)
    const marks = wrapper.find('Line')
    expect(marks.length).to.equal(2)
  })

  describe('with an active mark', function () {
    it('should show that mark as active', function () {
      const wrapper = shallow(<DrawingToolMarks activeMarkId='line1' tool={tool} svg={svg} />)
      const mark = wrapper.find('Line').first()
      expect(mark.prop('active')).to.be.true()
    })

    it('should render a delete button', function () {
      const wrapper = shallow(<DrawingToolMarks activeMarkId='line1' tool={tool} svg={svg} />)
      const line = tool.marks.get('line1')
      const deleteButton = wrapper.find('DeleteButton')
      expect(deleteButton.prop('mark')).to.equal(line)
    })
  })

  describe('when a mark is moved to a new position', function () {
    let dragEnd
    let onDeselectMark
    let onDelete
    let deleteMark

    before(function () {
      deleteMark = sinon.spy(tool, 'deleteMark')
      onDeselectMark = sinon.stub()
      onDelete = sinon.stub()
      const wrapper = shallow(
        <DrawingToolMarks
          onDelete={onDelete}
          onDeselectMark={onDeselectMark}
          tool={tool}
          svg={svg}
        />
      )
      dragEnd = wrapper.find(DrawingToolRoot).first().prop('dragEnd')
    })

    it('should deselect the mark', function () {
      const mockBounds = { left: 0, top: 0, right: 100, bottom: 100, width: 100, height: 100 }
      const currentTarget = {
        getBoundingClientRect: () => mockBounds
      }
      const fakeEvent = { currentTarget }
      dragEnd(fakeEvent)
      expect(onDeselectMark).to.have.been.calledOnce()
    })

    describe('when the mark is inside the SVG element', function () {
      it('should do nothing', function () {
        const mockBounds = { left: 0, top: 0, right: 100, bottom: 100, width: 100, height: 100 }
        const currentTarget = {
          getBoundingClientRect: () => mockBounds
        }
        const fakeEvent = { currentTarget }
        dragEnd(fakeEvent)
        expect(tool.marks.size).to.equal(2)
        expect(onDelete).to.not.have.been.called()
      })
    })

    describe('when the mark overlaps the SVG element', function () {
      it('should do nothing', function () {
        const mockBounds = { left: 1990, top: 20, right: 2090, bottom: 120, width: 100, height: 100 }
        const currentTarget = {
          getBoundingClientRect: () => mockBounds
        }
        const fakeEvent = { currentTarget }
        dragEnd(fakeEvent)
        expect(tool.marks.size).to.equal(2)
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
        expect(onDelete).to.have.been.calledOnce()
        expect(deleteMark).to.have.been.calledOnce()
      })
    })
  })
})