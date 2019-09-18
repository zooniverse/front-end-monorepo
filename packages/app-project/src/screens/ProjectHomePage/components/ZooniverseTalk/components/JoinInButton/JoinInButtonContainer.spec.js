import { shallow } from 'enzyme'
import React from 'react'

import { JoinInButtonContainer } from './JoinInButtonContainer'
import JoinInButton from './JoinInButton'

let wrapper
let componentWrapper

const SLUG = 'owner/slug'

describe('Component > JoinInButtonContainer', function () {
  before(function () {
    wrapper = shallow(<JoinInButtonContainer slug={SLUG} />)
    componentWrapper = wrapper.find(JoinInButton)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `JoinInButton` component', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })

  it('should pass a valid talk href', function () {
    expect(componentWrapper.prop('href')).to.equal(`/projects/${SLUG}/talk`)
  })
})
