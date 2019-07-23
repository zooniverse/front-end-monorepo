import { shallow } from 'enzyme'
import React from 'react'

import { NavLink } from './NavLink'

let wrapper
const TEXT = 'Foobar'
const HREF = `http://www.foobar.com/projects/foo/bar`
const AS = '/page?owner=foo?project=bar'
const ROUTER = {
  asPath: `/projects/projects/foo/bar`
}

describe('Component > NavLink', function () {
  before(function () {
    wrapper = shallow(<NavLink as={AS} href={HREF} router={ROUTER} text={TEXT} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should have the correct text', function () {
    expect(wrapper.render().text()).to.include(TEXT)
  })

  it('should have the correct `href`', function () {
    expect(wrapper.prop('href')).to.equal(HREF)
  })

  it('should have the correct `as`', function () {
    expect(wrapper.prop('as')).to.equal(AS)
  })
})
