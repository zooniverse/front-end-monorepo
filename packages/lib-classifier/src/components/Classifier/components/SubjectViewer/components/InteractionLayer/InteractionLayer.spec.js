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
  const mockSVGPoint = {
    x: 100,
    y: 200,
    matrixTransform: sinon.stub().callsFake(() => ({
      x: 100,
      y: 200
    }))
  }
  const mockScreenCTM = {
    a: 1,
    b: 1,
    c: 1,
    d: 1,
    e: 1,
    f: 1,
    inverse: () => ({
      a: 1,
      b: 1,
      c: 1,
      d: 1,
      e: 1,
      f: 1
    })
  }
  const svg = document.createElementNS("http://www.w3.org/2000/svg","svg")
  svg.createSVGPoint = () => mockSVGPoint
  svg.getScreenCTM = () => mockScreenCTM

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
        svg={svg}
        width={600}
      />)
  })

  afterEach(function () {
    mockMark.initialDrag.resetHistory()
    mockMark.initialPosition.resetHistory()
    mockMark.setCoordinates.resetHistory()
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
      const fakeEvent = {
        type: 'pointer'
      }
      wrapper.find(StyledRect).simulate('pointerdown', fakeEvent)
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

  describe('when disabled', function () {
    it('should not create a mark on pointer down', function () {
      const fakeEvent = {
        type: 'pointer'
      }
      wrapper.setProps({ disabled: true })
      wrapper.find(StyledRect).simulate('pointerdown', fakeEvent)
      expect(activeTool.createMark).to.have.not.been.called()
    })

    it('should drag a new mark on pointer down + move', function () {
      const fakeEvent = {
        type: 'pointer'
      }
      wrapper.find(StyledRect).simulate('pointerdown', fakeEvent)
      wrapper.setProps({ disabled: true })
      wrapper.simulate('pointermove', fakeEvent)
      expect(mockMark.initialDrag).to.have.been.calledOnce()
    })
  })
})
