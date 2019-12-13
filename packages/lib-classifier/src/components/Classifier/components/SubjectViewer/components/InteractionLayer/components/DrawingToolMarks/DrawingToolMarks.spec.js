import React from 'react'
import { shallow } from 'enzyme'
import { PointTool, LineTool } from '@plugins/drawingTools/models/tools'
import { Point, Line } from '@plugins/drawingTools/models/marks'
import DrawingToolMarks from './DrawingToolMarks'

describe('Components > DrawingToolMarks', function () {
  let svg
  let tool

  beforeEach(function () {
    svg = document.createElement('svg')
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
})