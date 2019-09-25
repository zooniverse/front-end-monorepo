import { render } from 'enzyme'
import React from 'react'

import { NavLink } from './NavLink'

const ROUTER_ON_CURRENT_PAGE = {
  asPath: '/projects/foo/bar/baz',
  pathname: '/projects/[project]/[owner]/baz'
}

const ROUTER_ON_OTHER_PAGE = {
  asPath: '/projects/foo/bar/bing',
  pathname: '/projects/[project]/[owner]/bing'
}

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

  describe('when on the current page', function () {
    it(`should have an href`, function () {
      expect(wrapper.attr('href')).to.equal(LINK.as)
    })
  })

  describe('when not on the current page', function () {
    it(`should not have an href`, function () {
      wrapper = render(<NavLink router={ROUTER_ON_CURRENT_PAGE} link={LINK} />)
      expect(wrapper.attr('href')).to.equal(undefined)
    })
  })
})
