import { shallow } from 'enzyme'
import { Paragraph } from 'grommet'
import React from 'react'

import FinishedForTheDay from './FinishedForTheDay'
import ProjectImage from './components/ProjectImage'
import RelatedProjects from './components/RelatedProjects'

const projectName = 'Foobar'
const imageSrc = 'foobar.jpg'

let wrapper

describe('Component > FinishedForTheDay', function () {
  before(function () {
    wrapper = shallow(<FinishedForTheDay projectName={projectName} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should contain a title', function () {
    expect(wrapper.find('Heading')).to.have.lengthOf(1)
  })

  it('should contain some text', function () {
    const para = wrapper.find(Paragraph)
    expect(para).to.have.lengthOf(1)
    expect(para.text().length).to.be.ok()
  })

  // TODO: Add `<RelatedProjects />` back in once API is up
  xit('should contain a related projects button', function () {
    expect(wrapper.find(RelatedProjects)).to.have.lengthOf(1)
  })

  it('should not contain a `ProjectImage` if there\'s no `imgSrc` prop', function () {
    expect(wrapper.find(ProjectImage)).to.have.lengthOf(0)
  })

  it('should contain a `ProjectImage` if an `imageSrc` prop is present', function () {
    const wrapper = shallow(<FinishedForTheDay projectName={projectName} imageSrc={imageSrc} />)
    const projectImageWrapper = wrapper.find(ProjectImage)
    expect(projectImageWrapper).to.have.lengthOf(1)
    expect(projectImageWrapper.prop('imageSrc')).to.equal(imageSrc)
  })

  describe('stats link', function () {
    before(function () {
      wrapper = shallow(<FinishedForTheDay projectName={projectName} />)
    })

    it('should not render the link if the user is not logged in', function () {
      expect(wrapper.find('Link')).to.have.lengthOf(0)
    })

    it('should render the link if the user is logged in', function () {
      wrapper.setProps({ isLoggedIn: true })
      const link = wrapper.find('Link')
      expect(link).to.have.lengthOf(1)
      expect(link.props().href).to.equal('/#projects')
    })
  })
})
