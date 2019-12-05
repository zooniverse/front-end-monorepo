import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import styled from 'styled-components'

import InteractionLayer, { StyledRect } from './InteractionLayer'
import DrawingTask from '@plugins/tasks/DrawingTask'
import { Line, Point } from '@plugins/drawingTools/components'

describe('Component > InteractionLayer', function () {
  let wrapper
  let activeTool
  const mockMark = {
    initialDrag: sinon.stub(),
    initialPosition: sinon.stub(),
    setCoordinates: sinon.stub()
  }
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
    const mockDrawingTask = DrawingTask.TaskModel.create({
      activeToolIndex: 0,
      instruction: 'draw a mark',
      taskKey: 'T0',
      tools: [
        {
          marks: {},
          max: 2,
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
    activeTool = mockDrawingTask.activeTool
    sinon.stub(activeTool, 'createMark').callsFake(() => mockMark)
    wrapper = shallow(
      <InteractionLayer
        activeDrawingTask={mockDrawingTask}
        activeTool={activeTool}
        height={400}
        svg={mockSVG}
        width={600}
      />)
  })

  afterEach(function () {
    activeTool.createMark.restore()
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
    it('should create a mark on pointer down', function () {
      const fakeEvent = {
        type: 'pointer'
      }
      wrapper.find(StyledRect).simulate('pointerdown', fakeEvent)
      expect(activeTool.createMark).to.have.been.calledOnce()
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
