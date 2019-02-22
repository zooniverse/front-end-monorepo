import { shallow } from 'enzyme'
import React from 'react'

import LoginModal from './LoginModal'

let wrapper

describe('Component > LoginModal', function () {
  before(function () {
    wrapper = shallow(<LoginModal
      closeLoginModal={Function.prototype}
      loading={false}
      onSubmit={Function.prototype}
    />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
