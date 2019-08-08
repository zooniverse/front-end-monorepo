import { render } from 'enzyme'
import React from 'react'

import { NavLink } from './NavLink'

const ROUTER_ON_CURRENT_PAGE = { pathname: '/projects/[project]/[owner]/baz' }
const ROUTER_ON_OTHER_PAGE = { pathname: '/projects/[project]/[owner]/bing' }

const LINK = {
  as: '/projects/foo/bar/baz',
  href: '/projects/[project]/[owner]/baz',
  text: 'Foobar'
}

describe('Component > NavLink', function () {
  let wrapper

  beforeEach(function () {
    wrapper = render(<NavLink router={ROUTER_ON_OTHER_PAGE} link={LINK} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should have the correct text', function () {
    expect(wrapper.text()).to.equal(LINK.text)
  })

  it(`should have an href if it's not the current page`, function () {
    expect(wrapper.attr('href')).to.equal(LINK.as)
  })

  it(`should not have an href if it's the current page`, function () {
    wrapper = render(<NavLink router={ROUTER_ON_CURRENT_PAGE} link={LINK} />)
    expect(wrapper.attr('href')).to.equal(undefined)
  })
})
