import { shallow } from 'enzyme'
import React from 'react'
import InteractionLayerContainer from './InteractionLayerContainer'
import DrawingContainer from '../Drawing/DrawingContainer'

describe('Component > InteractionLayerContainer', function () {
  it('should render without crashing', function () {
    shallow(<InteractionLayerContainer.wrappedComponent />)
  })

  describe('with an active drawing task', function () {
    it('should render an InteractionLayer', function () {
      const wrapper = shallow(<InteractionLayerContainer.wrappedComponent activeDrawingTask />)
      expect(wrapper.find('InteractionLayer')).to.have.lengthOf(1)
    })
  })

  describe('with active workflow step including a drawing task', function () {
    it('should render a DrawingContainer', function () {
      const wrapper = shallow(<InteractionLayerContainer.wrappedComponent activeStepTasks={activeStepTasksWithDrawing} />)
      expect(wrapper.find(DrawingContainer)).to.have.lengthOf(1)
    })
  })

  describe('with active workflow step excluding a drawing task', function () {
    it('should not render a DrawingContainer', function () {
      const wrapper = shallow(<InteractionLayerContainer.wrappedComponent activeStepTasks={activeStepTasksWithSingleChoice} />)
      expect(wrapper.find(DrawingContainer)).to.have.lengthOf(0)
    })
  })
})
