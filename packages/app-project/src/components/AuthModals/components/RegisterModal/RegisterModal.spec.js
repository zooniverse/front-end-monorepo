import { shallow } from 'enzyme'
import React from 'react'

import RegisterModal from './RegisterModal'

let wrapper

describe('Component > RegisterModal', function () {
  before(function () {
    wrapper = shallow(<RegisterModal />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
