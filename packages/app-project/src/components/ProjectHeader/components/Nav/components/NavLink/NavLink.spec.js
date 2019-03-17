import { shallow } from 'enzyme'
import React from 'react'

import { NavLink } from './NavLink'

let wrapper
const TEXT = 'Foobar'
const OWNER = 'foo'
const PROJECT = 'bar'
const HREF = `http://www.foobar.com/projects/${OWNER}/${PROJECT}`
const ROUTER = {
  asPath: `/projects/${OWNER}/${PROJECT}`
}
const BASE_URL = `/projects/${OWNER}/${PROJECT}`

describe('Component > NavLink', function () {
  before(function () {
    wrapper = shallow(<NavLink href={HREF} router={ROUTER} text={TEXT} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should have the correct text', function () {
    expect(wrapper.text()).to.equal(TEXT)
  })

  it('should have the correct `href`', function () {
    expect(wrapper.prop('href')).to.equal(HREF)
  })
})
