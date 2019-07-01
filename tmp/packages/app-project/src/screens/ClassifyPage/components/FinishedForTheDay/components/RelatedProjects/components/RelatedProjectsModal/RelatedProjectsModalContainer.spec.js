import { shallow } from 'enzyme'
import React from 'react'

import RelatedProjectsModalContainer from './RelatedProjectsModalContainer'
import RelatedProjectsModal from './RelatedProjectsModal'

let wrapper
let componentWrapper

let PROJECT_TITLE = 'foobar'
let OTHER_PROPS = {
  foo: 'bar',
  baz: 'qux'
}

describe('Component > RelatedProjectsModalContainer', function () {
  before(function () {
    wrapper = shallow(<RelatedProjectsModalContainer.wrappedComponent
      projectTitle={PROJECT_TITLE}
      {...OTHER_PROPS}
    />)
    componentWrapper = wrapper.find(RelatedProjectsModal)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `RelatedProjectsModal` component', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })

  it('should pass down a `projectTitle` prop', function () {
    expect(componentWrapper.prop('projectTitle')).to.equal(PROJECT_TITLE)
  })

  it('should pass down its received props', function () {
    Object.entries(OTHER_PROPS).forEach(([key, value]) => {
      expect(componentWrapper.prop(key)).to.equal(value)
    })
  })
})
