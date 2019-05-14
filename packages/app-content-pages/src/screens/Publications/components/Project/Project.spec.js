import { shallow } from 'enzyme'
import React from 'react'

import Publication from '../Publication'
import Project from './Project'

let wrapper
const TITLE = 'Foobar'
const PUBLICATIONS = [
  {
    title: 'Baz'
  }
]

describe('Component > Project', function () {
  before(function () {
    wrapper = shallow(<Project title={TITLE} publications={PUBLICATIONS} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the project name and project count', function () {
    expect(wrapper.find('Heading').shallow().text()).to.include(TITLE)
    expect(wrapper.find('Heading').shallow().text()).to.include(PUBLICATIONS.length)
  })

  it('should render a <Publication /> for each publication available', function () {
    const publicationsWrapper = wrapper.find(Publication)
    expect(publicationsWrapper).to.have.lengthOf(PUBLICATIONS.length)
    PUBLICATIONS.forEach(function (PUBLICATION) {
      expect(publicationsWrapper.find(PUBLICATION)).to.have.lengthOf(1)
    })
  })
})
