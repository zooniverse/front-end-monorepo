import { shallow } from 'enzyme'
import { Paragraph } from 'grommet'
import React from 'react'

import { FinishedForTheDay } from './FinishedForTheDay'
import ProjectImage from './components/ProjectImage'
import RelatedProjects from './components/RelatedProjects'

const PROJECT_NAME = 'Foobar'
const IMAGE_SRC = 'foobar.jpg'
const LINK_PROPS = {
  as: '/projects/foo/bar/stats',
  href: '/projects/[owner]/[project]/stats'
}

describe('Component > FinishedForTheDay', function () {
  let wrapper

  before(function () {
    wrapper = shallow(<FinishedForTheDay
      linkProps={LINK_PROPS}
      projectName={PROJECT_NAME}
    />)
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

  describe('project image', function () {
    it('should not contain a `ProjectImage` if there\'s no `imgSrc` prop', function () {
      expect(wrapper.find(ProjectImage)).to.have.lengthOf(0)
    })

    it('should contain a `ProjectImage` if an `imageSrc` prop is present', function () {
      const wrapper = shallow(<FinishedForTheDay
        imageSrc={IMAGE_SRC}
        linkProps={LINK_PROPS}
        projectName={PROJECT_NAME}
      />)
      const projectImageWrapper = wrapper.find(ProjectImage)
      expect(projectImageWrapper).to.have.lengthOf(1)
      expect(projectImageWrapper.prop('imageSrc')).to.equal(IMAGE_SRC)
    })
  })

  describe('stats link', function () {
    it('should render a link to the project stats page', function () {
      const link = wrapper.find('Link')
      expect(link).to.have.lengthOf(1)
      expect(link.prop('as')).to.equal(LINK_PROPS.as)
      expect(link.prop('href')).to.equal(LINK_PROPS.href)
    })
  })
})
