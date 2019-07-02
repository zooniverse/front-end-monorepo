import { shallow } from 'enzyme'
import React from 'react'

import Banners from './Banners'
import AlreadySeenBanner from './components/AlreadySeenBanner'
import RetiredBanner from './components/RetiredBanner'
import UserHasFinishedWorkflowBanner from './components/UserHasFinishedWorkflowBanner'
import WorkflowIsFinishedBanner from './components/WorkflowIsFinishedBanner'

let wrapper

describe('Component > Banners', function () {
  before(function () {
    wrapper = shallow(<Banners />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `AlreadySeenBanner` component', function () {
    expect(wrapper.find(AlreadySeenBanner)).to.have.lengthOf(1)
  })

  it('should render the `RetiredBanner` component', function () {
    expect(wrapper.find(RetiredBanner)).to.have.lengthOf(1)
  })

  it('should render the `UserHasFinishedWorkflowBanner` component', function () {
    expect(wrapper.find(UserHasFinishedWorkflowBanner)).to.have.lengthOf(1)
  })

  it('should render the `WorkflowIsFinishedBanner` component', function () {
    expect(wrapper.find(WorkflowIsFinishedBanner)).to.have.lengthOf(1)
  })
})
