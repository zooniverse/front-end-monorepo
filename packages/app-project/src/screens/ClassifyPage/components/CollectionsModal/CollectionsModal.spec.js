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

  it('should contain a text input to search collections by name', function () {

  })

  it('should contain a text input to create new collections by name', function () {

  })

  it('should contain a checkbox to create new private collections', function () {

  })
})
