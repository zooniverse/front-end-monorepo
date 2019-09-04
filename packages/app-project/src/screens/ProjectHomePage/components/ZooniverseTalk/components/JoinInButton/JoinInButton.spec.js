import { render } from 'enzyme'
import React from 'react'

import JoinInButton from './JoinInButton'

let wrapper
const HREF = '/projects/owner/slug/talk'

describe('Component > JoinInButton', function () {
  before(function () {
    wrapper = render(<JoinInButton href={HREF} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render a link to the talk boards', function () {
    expect(wrapper.is('a')).to.be.true()
    expect(wrapper.attr('href')).to.equal(HREF)
  })
})
