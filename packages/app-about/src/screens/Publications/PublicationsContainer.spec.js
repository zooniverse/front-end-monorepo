import { shallow } from 'enzyme'
import React from 'react'

import PublicationsContainer from './PublicationsContainer'
import Publications from './Publications'

let wrapper
let componentWrapper

const PUBLICATIONS = {
  activeFilter: '',
  currentView: [],
  filters: [''],
  setActiveFilter: () => {},
}

describe('Component > PublicationsContainer', function () {
  before(function () {
    wrapper = shallow(<PublicationsContainer.wrappedComponent publications={PUBLICATIONS} />)
    componentWrapper = wrapper.find(Publications)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `Publications` component', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })
})
