import { render } from 'enzyme'
import React from 'react'

import Introduction from './Introduction'

let wrapper

const DESCRIPTION = 'Project Title!'
const LINK = {
  href: '/projects/foo/bar/about'
}
const TITLE = 'baz'

describe('Component > Introduction', function () {
  before(function () {
    wrapper = render(<Introduction
      description={DESCRIPTION}
      link={LINK}
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
    expect(wrapper.find(`a[href="${LINK.href}"]`)).to.have.lengthOf(1)
  })
})
