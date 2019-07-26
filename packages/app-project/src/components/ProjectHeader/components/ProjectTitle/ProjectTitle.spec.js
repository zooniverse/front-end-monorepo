import { shallow, render } from 'enzyme'
import React from 'react'

import ProjectTitle from './ProjectTitle'

const LINK = {
  as: '/foo',
  href: '/page?slug=foo'
}
const TITLE = 'Project title'

describe('Component > ProjectTitle', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<ProjectTitle title={TITLE} />)
    expect(wrapper).to.be.ok()
  })

  it('should render the title prop as an h1', function () {
    const title = render(<ProjectTitle title={TITLE} />)
    expect(title.get(0).tagName).to.equal('h1')
    expect(title.text()).to.equal(TITLE)
  })

  it('should wrap the heading in an anchor if it has the `link` prop', function () {
    const wrapper = render(<ProjectTitle link={LINK} title={TITLE} />)

    const link = wrapper.get(0)
    expect(link.tagName).to.equal('a')
    expect(wrapper.prop('href')).to.equal(LINK.as)

    const title = wrapper.find('h1')
    expect(title).to.have.lengthOf(1)
    expect(title.text()).to.equal(TITLE)
  })
})
