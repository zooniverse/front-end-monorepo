import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'

import InteractionLayer from './InteractionLayer'
import { Line, Point } from '@plugins/tasks/DrawingTask/components/tools'

describe('Component > InteractionLayer', function () {
  let wrapper
  const mockMark = {
    setCoordinates: sinon.stub()
  }
  const mockDrawingTask = {
    activeToolIndex: 0,
    activeTool: {
      createMark: sinon.stub().callsFake(() => mockMark)
    },
    tools: [
      {
        marks: new Map([]),
        toolComponent: Point
      },
      {
        marks: new Map([]),
        toolComponent: Line
      }
    ]
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
    wrapper = shallow(<InteractionLayer activeDrawingTask={mockDrawingTask} svg={mockSVG} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should return a transparent rect', function () {
    const rect = wrapper.find('rect')
    expect(rect.exists()).to.be.true()
    expect(rect.prop('id')).to.equal('InteractionLayer')
    expect(rect.prop('fill')).to.equal('transparent')
  })

  it('should create a mark on pointer down', function () {
    const fakeEvent = {
      type: 'pointer'
    }
    wrapper.simulate('pointerdown', fakeEvent)
    expect(mockDrawingTask.activeTool.createMark).to.have.been.calledOnce()
  })
})
