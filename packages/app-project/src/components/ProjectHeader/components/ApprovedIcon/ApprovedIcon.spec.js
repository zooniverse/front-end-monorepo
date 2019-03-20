import { shallow } from 'enzyme'
import React from 'react'

import ApprovedIcon from './ApprovedIcon'

let wrapper

describe('Component > ApprovedIcon', function () {
  before(function () {
    wrapper = shallow(<ApprovedIcon />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render null if the `approved` prop is `false`', function () {
    expect(wrapper.isEmptyRender()).to.be.ok()
  })

  it('should render an icon if `approved` is true', function () {
    const approvedWrapper = shallow(<ApprovedIcon approved={true} />)
    expect(approvedWrapper.find('FormCheckmark')).to.have.lengthOf(1)
  })
})
