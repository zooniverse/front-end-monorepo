import { shallow } from 'enzyme'
import React from 'react'

import ProjectHeader from './ProjectHeader'

const HREF = '/foo'
const TITLE = 'Project title'
let wrapper

describe('Component > ProjectHeader', function () {
  before(function () {
    wrapper = shallow(<ProjectHeader title={TITLE} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the title prop as an h1', function () {
    const title = wrapper.find('Title').render()
    expect(title.is('h1')).to.be.ok()
    expect(title.text()).to.equal(TITLE)
  })

  it('should wrap the heading in an anchor if it has an `href` prop', function () {
    const wrapperWithHref = shallow(<ProjectHeader href={HREF} title={TITLE} />)
    const linkWrapper = wrapperWithHref.find('ProjectHeader__StyledAnchor')
    expect(linkWrapper).to.have.lengthOf(1)
    expect(linkWrapper.prop('href')).to.equal(HREF)
  })
})
