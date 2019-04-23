import { shallow } from 'enzyme'
import React from 'react'

import GrommetWrapperContainer from './GrommetWrapperContainer'

let wrapper

describe('Component > GrommetWrapperContainer', function () {
  before(function () {
    wrapper = shallow(<GrommetWrapperContainer.wrappedComponent />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
