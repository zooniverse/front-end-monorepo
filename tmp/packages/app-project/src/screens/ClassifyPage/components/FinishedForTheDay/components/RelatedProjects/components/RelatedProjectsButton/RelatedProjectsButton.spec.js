import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'

import RelatedProjectsButton from './RelatedProjectsButton'

let wrapper
const onClick = sinon.stub()

describe('Component > RelatedProjectsButton', function () {
  before(function () {
    wrapper = shallow(<RelatedProjectsButton
      onClick={onClick}
    />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should have an `a11yTitle` prop', function () {
    expect(wrapper.prop('a11yTitle')).to.be.ok()
  })

  it('should call the `onClick` function prop on click', function () {
    wrapper.simulate('click')
    expect(onClick).to.have.been.calledOnce()
  })
})
