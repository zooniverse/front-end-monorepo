import { shallow, render } from 'enzyme'
import React from 'react'

import ModalHeading from './ModalHeading'

let wrapper
const title = 'Modal Heading'

describe('Modal > ModalHeading', function () {
  before(function () {
    wrapper = shallow(<ModalHeading closeFn={() => {}} title={title} />)
  })
  it('should render without crashing', function () {
    expect(wrapper).to.be.ok
  })

  it('should render the title prop', function () {
    expect(wrapper.render().text()).to.equal(title)
  })

  it('should render the title as an h2', function () {
    expect(wrapper.render().children().eq(0).is('h2')).to.be.true
  })
})
