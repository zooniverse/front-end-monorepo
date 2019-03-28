import { shallow } from 'enzyme'
import React from 'react'

import Banners from './Banners'
import AlreadySeenBanner from './components/AlreadySeenBanner'
import RetiredBanner from './components/RetiredBanner'

let wrapper

describe('Component > Banners', function () {
  before(function () {
    wrapper = shallow(<Banners />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok
  })

  it('should render the `AlreadySeenBanner` component', function () {
    expect(wrapper.find(AlreadySeenBanner)).to.have.lengthOf(1)
  })

  it('should render the `RetiredBanner` component', function () {
    expect(wrapper.find(RetiredBanner)).to.have.lengthOf(1)
  })
})
