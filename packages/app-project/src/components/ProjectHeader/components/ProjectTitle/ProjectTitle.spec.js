import { render } from 'enzyme'
import React from 'react'

import ProjectTitle from './ProjectTitle'

let wrapper

const ROUTER_ON_HOME_PAGE = {
  pathname: '/projects/[owner]/[project]',
  query: {
    owner: 'foo',
    project: 'bar'
  }
}

const ROUTER_ON_OTHER_PAGE = {
  pathname: '/projects/[owner]/[project]/foo',
  query: {
    owner: 'foo',
    project: 'bar'
  }
}

const TITLE = 'Project title'

describe('Component > ProjectTitle', function () {
  before(function () {
    wrapper = render(<ProjectTitle router={ROUTER_ON_HOME_PAGE} title={TITLE} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the title prop as an h1', function () {
    const title = wrapper.find('h1')
    expect(title).to.have.lengthOf(1)
    expect(title.text()).to.equal(TITLE)
  })

  it('should be wrapped in an anchor with no `href` if on the home page', function () {
    expect(wrapper[0].name).to.equal('a')
    expect(wrapper.href).to.equal(undefined)

  })

  it('should be wrapped in an anchor with an `href` if on any other page', function () {
    wrapper = render(<ProjectTitle router={ROUTER_ON_OTHER_PAGE} title={TITLE} />)
    expect(wrapper[0].name).to.equal('a')
    expect(wrapper.attr('href')).to.equal('/projects/foo/bar')
  })
})
