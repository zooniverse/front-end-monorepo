import { shallow } from 'enzyme'
import React from 'react'

import CompletionBar from './CompletionBar'
import CompletionBarContainer from './CompletionBarContainer'

let wrapper
let completionBarWrapper

const COMPLETENESS = 0.4

describe('Component > CompletionBarContainer', function () {
  before(function () {
    wrapper = shallow(<CompletionBarContainer.wrappedComponent
      completeness={COMPLETENESS}
    />)
    completionBarWrapper = wrapper.find(CompletionBar)
  })

  it('should render without crashing', function () {})

  it('should render the `CompletionBar` component', function () {
    expect(completionBarWrapper).to.have.lengthOf(1)
  })

  it('should pass through a `completeness` prop', function () {
    expect(completionBarWrapper.prop('completeness')).to.equal(COMPLETENESS)
  })
})
