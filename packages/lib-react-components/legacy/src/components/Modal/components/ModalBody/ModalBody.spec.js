import { shallow } from 'enzyme'
import React from 'react'

import ModalBody from './ModalBody'

const content = (
  <div>
    Leo mollis dictum id dis maecenas consectetur metus elementum vivamus nisl, suscipit tristique lectus nulla mus etiam nisi facilisis magnis, scelerisque ligula montes luctus cursus nibh vulputate parturient risus.
  </div>
)

describe('Modal > ModalBody', function () {
  it('should render without crashing', function () {
    shallow(<ModalBody>{content}</ModalBody>)
  })

  it('should render its children', function () {
    const wrapper = shallow(<ModalBody>{content}</ModalBody>)
    const contentWrapper = shallow(content)
    expect(wrapper.text()).to.equal(contentWrapper.text())
  })
})
