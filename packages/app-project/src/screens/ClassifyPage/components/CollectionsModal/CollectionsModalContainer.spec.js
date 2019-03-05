import { shallow } from 'enzyme'
import React from 'react'

import CollectionsModalContainer from './CollectionsModalContainer'
import CollectionsModal from './CollectionsModal'

let wrapper
let componentWrapper

describe('Component > CollectionsModalContainer', function () {
  before(function () {
    wrapper = shallow(<CollectionsModalContainer.wrappedComponent />)
    componentWrapper = wrapper.find(CollectionsModal)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `CollectionsModal` component', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })

  describe('with a partial collection name', function () {
    it('should fetch a list of collections filtered by name', function () {

    })
  })

  describe('with a selected collection and subjects', function () {
    it('should add those subjects to the selected collection', function () {

    })
  })

  describe('with a new collection name', function () {
    it('should create a new collection with that name', function () {

    })

    it('should create a new collection with the supplied subjects', function () {

    })
  })
})
