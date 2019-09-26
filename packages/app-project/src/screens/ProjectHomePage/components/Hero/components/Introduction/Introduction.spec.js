import { render } from 'enzyme'
import React from 'react'

import Introduction from './Introduction'

const DESCRIPTION = 'Project Title!'
const LINK_PROPS = {
  as: '/projects/foo/bar/about',
  href: '/projects/[owner]/[project]/about'
}
const TITLE = 'baz'

describe('Component > Introduction', function () {
  let wrapper

  before(function () {
    wrapper = render(<Introduction
      description={DESCRIPTION}
      linkProps={LINK_PROPS}
      title={TITLE}
    />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the title', function () {
    expect(wrapper.text().includes(TITLE)).to.be.true()
  })

  it('should render the description', function () {
    expect(wrapper.text().includes(DESCRIPTION)).to.be.true()
  })

  it('should render a link to the about page', function () {
    expect(wrapper.find(`a[href="${LINK_PROPS.as}"]`)).to.have.lengthOf(1)
  })
})
