import { shallow } from 'enzyme'
import React from 'react'

import ZooHeaderContainer from './ZooHeaderContainer'
import ZooHeader from './ZooHeader'

describe('ZooHeaderContainer', function () {
  let wrapper

  before(function () {
    wrapper = shallow(<ZooHeaderContainer signIn={() => { }} signOut={() => { }} user={{}} />)
  })

  it('renders without crashing', function () { })

  it('renders ZooHeader', function () {
    expect(wrapper.find(ZooHeader)).to.have.lengthOf(1)
  })
})
