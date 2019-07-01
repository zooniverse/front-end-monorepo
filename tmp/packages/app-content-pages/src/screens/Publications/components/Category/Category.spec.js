import { shallow } from 'enzyme'
import React from 'react'

import Category from './Category'
import Project from '../Project'

let wrapper
const TITLE = 'Foobar'
const PROJECTS = [
  {
    title: 'Baz'
  }
]

describe('Component > Category', function () {
  before(function () {
    wrapper = shallow(<Category title={TITLE} projects={PROJECTS} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the category name', function () {
    expect(wrapper.find('Heading').shallow().text()).to.equal(TITLE)
  })

  it('should render a <Project /> for each project available', function () {
    const projectsWrapper = wrapper.find(Project)
    expect(projectsWrapper).to.have.lengthOf(PROJECTS.length)
    PROJECTS.forEach(function (PROJECT) {
      expect(projectsWrapper.find(PROJECT)).to.have.lengthOf(1)
    })
  })
})
