import { shallow } from 'enzyme'
import React from 'react'
import InteractionLayerContainer from './InteractionLayerContainer'

describe('Component > InteractionLayerContainer', function () {
  it('should render without crashing', function () {
    shallow(
      <InteractionLayerContainer.wrappedComponent
        addToStream={() => {}}
        storeSVG={() => {}}
      />)
  })

  it('should render an InteractionLayer', function () {
    const wrapper = shallow(
      <InteractionLayerContainer.wrappedComponent
        addToStream={() => {}}
        storeSVG={() => {}}
      />)
    expect(wrapper.find('InteractionLayer')).to.have.lengthOf(1)
  })

  describe('with active workflow step including a drawing task', function () {
    it('should render a DrawingContainer', function () {
      const wrapper = shallow(
        <InteractionLayerContainer.wrappedComponent
          addToStream={() => {}}
          isDrawingInActiveWorkflowStep
          storeSVG={() => {}}
        />)
      expect(wrapper.find('inject-DrawingContainer')).to.have.lengthOf(1)
    })
  })

  describe('with active workflow step excluding a drawing task', function () {
    it('should not render a DrawingContainer', function () {
      const wrapper = shallow(
        <InteractionLayerContainer.wrappedComponent
          addToStream={() => {}}
          isDrawingInActiveWorkflowStep={false}
          storeSVG={() => {}}
        />)
      expect(wrapper.find('inject-DrawingContainer')).to.have.lengthOf(0)
    })
  })
})
