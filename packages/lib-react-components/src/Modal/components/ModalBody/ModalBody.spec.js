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

  describe('default padding', function () {
    let pad = {}

    before(function () {
      pad = shallow(<ModalBody>{content}</ModalBody>).prop('pad')
    })

    it('should be small at the top', function () {
      expect(pad.top).to.equal('small')
    })

    it('should be medium at the bottom', function () {
      expect(pad.bottom).to.equal('medium')
    })

    it('should be medium at the sides', function () {
      expect(pad.horizontal).to.equal('medium')
    })
  })
  it('should render its children', function () {
    const wrapper = shallow(<ModalBody>{content}</ModalBody>)
    const contentWrapper = shallow(content)
    expect(wrapper.text()).to.equal(contentWrapper.text())
  })
})
