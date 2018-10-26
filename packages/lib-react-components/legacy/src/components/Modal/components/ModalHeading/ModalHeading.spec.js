import { shallow, render } from 'enzyme'
import React from 'react'

import ModalHeading from './ModalHeading'

const title = 'Modal Heading'

describe('Modal > ModalHeading', function () {
  it('should render without crashing', function () {
    shallow(<ModalHeading closeFn={() => {}} title={title} />)
  })

  it('should render the title prop', function () {
    const wrapper = render(<ModalHeading closeFn={() => {}} title={title} />)
    expect(wrapper.text()).to.equal(title)
  })
})
