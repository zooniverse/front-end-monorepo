import { shallow } from 'enzyme'
import React from 'react'
import InteractionLayerContainer from './InteractionLayerContainer'

describe('Component > InteractionLayerContainer', function () {
  it('should render without crashing', function () {
    shallow(<InteractionLayerContainer.wrappedComponent />)
  })

  it('should render an InteractionLayer', function () {
    const wrapper = shallow(<InteractionLayerContainer.wrappedComponent />)
    expect(wrapper.find('InteractionLayer')).to.have.lengthOf(1)
  })

  describe('with active workflow steps including a drawing task', function () {
    it('should render a DrawingContainer', function () {
      // TODO: add activeStepTasks prop with drawing task
      const wrapper = shallow(<InteractionLayerContainer.wrappedComponent />)
      expect(wrapper.find('DrawingContainer')).to.have.lengthOf(1)
    })
  })

  describe('without active workflow steps including a drawing task', function () {
    it('should not render a DrawingContainer', function () {
      // TODO: add activeStepTasks prop without drawing task
      const wrapper = shallow(<InteractionLayerContainer.wrappedComponent />)
      expect(wrapper.find('DrawingContainer')).to.have.lengthOf(0)
    })
  })
})
