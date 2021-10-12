import { expect } from 'chai'
import { shallow } from 'enzyme'
import { Anchor } from 'grommet'
import Link from 'next/link'

import { NavLink } from './NavLink'

describe('Component > NavLink', function () {
  const ROUTER_ON_CURRENT_PAGE = {
    asPath: '/projects/foo/bar/baz',
    pathname: '/projects/[project]/[owner]/baz',
    query: {
      owner: 'foo',
      project: 'bar'
    }
  }

  const ROUTER_ON_OTHER_PAGE = {
    asPath: '/projects/foo/bar/bing',
    pathname: '/projects/[project]/[owner]/bing',
    query: {
      owner: 'foo',
      project: 'bar'
    }
  }

  const LINK = {
    href: '/projects/foo/bar/baz',
    text: 'Foobar'
  }

  describe('default behaviour', function () {
    let wrapper

    before(function () {
      wrapper = shallow(<NavLink router={ROUTER_ON_OTHER_PAGE} link={LINK} />)
    })

    it('should render without crashing', function () {
      expect(wrapper).to.be.ok()
    })

    it('should have the correct text', function () {
      const link = wrapper.find(Anchor)
      const { label } = link.props()
      expect(label.props.children).to.equal(LINK.text)
    })
  })

  describe('when not on the current page', function () {
    let wrapper

    before(function () {
      wrapper = shallow(<NavLink router={ROUTER_ON_OTHER_PAGE} link={LINK} />)
    })

    it('should have a link', function () {
      const link = wrapper.find(Link)
      expect(link).to.have.lengthOf(1)
    })

    it(`should have an href`, function () {
      const link = wrapper.find(Link)
      expect(link.prop('href')).to.equal(LINK.href)
    })
  })

  describe('when on the current page', function () {
    let wrapper

    before(function () {
      wrapper = shallow(<NavLink router={ROUTER_ON_CURRENT_PAGE} link={LINK} />)
    })

    it('should not have a href', function () {
      const link = wrapper.find(Anchor)
      expect(link.prop('href')).to.be.undefined()
    })

    it('should not have a link', function () {
      const link = wrapper.find(Link)
      expect(link).to.be.empty()
    })
  })

  describe('when the link is "disabled"', function () {
    let wrapper
    before(function () {
      wrapper = shallow(<NavLink disabled router={ROUTER_ON_OTHER_PAGE} link={LINK} />)
    })

    it('should render as a span', function () {
      expect(wrapper.find(Anchor).props().as).to.equal('span')
    })

    it('should not use client side links', function () {
      const nextLink = wrapper.find(Link)
      expect(nextLink).to.be.empty()
    })
  })
})
