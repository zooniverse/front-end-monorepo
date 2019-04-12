import { shallow } from 'enzyme'
import React from 'react'

import ClassifyPageContainer from './ClassifyPageContainer'
import ClassifyPage from './ClassifyPage'
import CollectionsModal from './components/CollectionsModal'

let wrapper
let componentWrapper

describe('Component > ClassifyPageContainer', function () {
  before(function () {
    wrapper = shallow(<ClassifyPageContainer.wrappedComponent />)
    componentWrapper = wrapper.find(ClassifyPage)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `ClassifyPage` component', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })

  it('should render the `CollectionsModal` component', function () {
    expect(wrapper.find(CollectionsModal)).to.have.lengthOf(1)
  })
})
