import { shallow } from 'enzyme'
import { Anchor } from 'grommet'
import Link from 'next/link'

import { NavLink } from './NavLink'

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

const PFE_LINK = {
  href: '/projects/foo/bar/about/research',
  text: 'Foobar'
}

describe('Component > NavLink', function () {
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

  describe('production PFE links', function () {
    let wrapper
    let panoptesEnv

    before(function () {
      panoptesEnv = process.env.PANOPTES_ENV
      process.env.PANOPTES_ENV = 'production'
      wrapper = shallow(<NavLink router={ROUTER_ON_OTHER_PAGE} link={PFE_LINK} />)
    })

    after(function () {
      process.env.PANOPTES_ENV = panoptesEnv
    })

    it('should use a link anchor', function () {
      const link = wrapper.find(Anchor)
      expect(link.prop('href')).to.equal(`https://www.zooniverse.org${PFE_LINK.href}`)
    })

    it('should not use client-side links', function () {
      const link = wrapper.find(Link)
      expect(link).to.be.empty()
    })
  })
})
