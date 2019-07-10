import { render } from 'enzyme'
import React from 'react'

import NavLink from './NavLink'

let wrapper

const HREF = '/baz'
const LABEL = 'Foobar'
const ROUTER = {
  asPath: '/'
}
describe('Component > NavLink', function () {
  before(function () {
    wrapper = render(<NavLink href={HREF} label={LABEL} router={ROUTER} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render an anchor tag', function () {
    expect(wrapper.is('a')).to.be.true()
  })

  it('should use the `href` prop to set the anchor `href`', function () {
    expect(wrapper.prop('href')).to.equal(HREF)
  })

  it('should use the `label` prop to set the anchor body', function () {
    expect(wrapper.text()).to.equal(LABEL)
  })
})
