import { shallow } from 'enzyme'
import React from 'react'

import ApprovedIconContainer from './ApprovedIconContainer'
import ApprovedIcon from './ApprovedIcon'

let wrapper
let componentWrapper
const APPROVED = false

describe('Component > ApprovedIconContainer', function () {
  before(function () {
    wrapper = shallow(<ApprovedIconContainer.wrappedComponent approved={APPROVED} />)
    componentWrapper = wrapper.find(ApprovedIcon)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `ApprovedIcon` component', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })

  it('should pass through the `approved` prop', function () {
    expect(componentWrapper.prop('approved')).to.equal(APPROVED)
  })
})
