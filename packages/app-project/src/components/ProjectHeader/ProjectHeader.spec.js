import { render } from 'enzyme'
import React from 'react'

import ProjectHeader from './ProjectHeader'

const TITLE = 'Project title'
let wrapper

describe('Component > ProjectHeader', function () {
  before(function () {
    wrapper = render(<ProjectHeader title={TITLE} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the title prop as an h1', function () {
    const heading = wrapper.find('h1')
    expect(heading).to.be.ok()
    expect(heading.text()).to.equal(TITLE)
  })
})
