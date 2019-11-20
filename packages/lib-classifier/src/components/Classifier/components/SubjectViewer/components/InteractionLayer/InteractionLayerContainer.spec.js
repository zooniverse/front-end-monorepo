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
})
