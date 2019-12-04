import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import styled from 'styled-components'

import InteractionLayer, { StyledRect } from './InteractionLayer'
import DrawingTask from '@plugins/tasks/DrawingTask'
import { Line, Point } from '@plugins/drawingTools/components'

describe('Component > InteractionLayer', function () {
  let wrapper
  const mockMark = {
    initialDrag: sinon.stub(),
    initialPosition: sinon.stub(),
    setCoordinates: sinon.stub()
  }
  const mockDrawingTask = DrawingTask.TaskModel.create({
    activeToolIndex: 0,
    instruction: 'draw a mark',
    taskKey: 'T0',
    tools: [
      {
        marks: {},
        toolComponent: Point,
        type: 'point'
      },
      {
        marks: {},
        toolComponent: Line,
        type: 'line'
      }
    ],
    type: 'drawing'
  })
  const mockSVGEvent = {
    matrixTransform: sinon.stub().callsFake(() => ({
      x: 100,
      y: 200
    }))
  }
  const mockSVG = {
    createSVGPoint: sinon.stub().callsFake(() => mockSVGEvent),
    getScreenCTM: sinon.stub().callsFake(() => ({
      inverse: sinon.stub()
    }))
  }

  beforeEach(function () {
    const { activeTool } = mockDrawingTask
    wrapper = shallow(<InteractionLayer activeDrawingTask={mockDrawingTask} activeTool={activeTool} svg={mockSVG} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render a transparent rect', function () {
    const rect = wrapper.find(StyledRect)
    expect(rect.exists()).to.be.true()
    expect(rect.prop('fill')).to.equal('transparent')
  })

  describe('on pointer events', function () {
    before(function () {
      sinon.stub(mockDrawingTask.activeTool, 'createMark').callsFake(() => mockMark)
    })

    after(function () {
      mockDrawingTask.activeTool.createMark.restore()
    })

    it('should create a mark on pointer down', function () {
      const fakeEvent = {
        type: 'pointer'
      }
      wrapper.find(StyledRect).simulate('pointerdown', fakeEvent)
      expect(mockDrawingTask.activeTool.createMark).to.have.been.calledOnce()
    })

    it('should place a new mark on pointer down', function () {
      expect(mockMark.initialPosition).to.have.been.calledOnce()
    })

    it('should drag the new mark on pointer down + move', function () {
      const fakeEvent = {
        type: 'pointer'
      }
      wrapper.find(StyledRect).simulate('pointerdown', fakeEvent)
      wrapper.simulate('pointermove', fakeEvent)
      expect(mockMark.initialDrag).to.have.been.calledOnce()
    })
  })
})
