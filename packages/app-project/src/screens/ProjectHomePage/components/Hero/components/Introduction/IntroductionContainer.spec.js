import { shallow } from 'enzyme'
import React from 'react'

import { IntroductionContainer } from './IntroductionContainer'
import Introduction from './Introduction'

let wrapper
let componentWrapper

const ROUTER = {
  query: {
    owner: 'foo',
    project: 'bar'
  }
}

describe('Component > IntroductionContainer', function () {
  before(function () {
    wrapper = shallow(<IntroductionContainer router={ROUTER} />)
    componentWrapper = wrapper.find(Introduction)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `Introduction` component', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })
})
