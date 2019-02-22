import { mount } from 'enzyme'
import React from 'react'

import ProjectLink from './ProjectLink'

let wrapper
const URL_OBJECT = {
  label: 'Foobar',
  path: '',
  url: 'https://foobar.com'
}

describe('Component > ProjectLink', function () {
  before(function () {
    wrapper = mount(<ProjectLink urlObject={URL_OBJECT} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render a link', function () {
    const link = wrapper.find('a')
    expect(link.prop('href')).to.equal(URL_OBJECT.url)
    expect(link.text()).to.equal(URL_OBJECT.label)
  })
})
