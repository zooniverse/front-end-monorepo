import { shallow } from 'enzyme'
import React from 'react'

import CollectionsModal from './CollectionsModal'

let wrapper

describe('Component > CollectionsModal', function () {
  before(function () {
    wrapper = shallow(<CollectionsModal />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
