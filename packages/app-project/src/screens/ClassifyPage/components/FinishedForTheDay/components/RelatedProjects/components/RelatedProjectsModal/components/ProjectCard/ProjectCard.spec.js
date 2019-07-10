import { render, shallow } from 'enzyme'
import React from 'react'

import ProjectCard from './ProjectCard'

let wrapper

const DESCRIPTION = 'description'
const IMAGE = 'https://foo.com/bar/image.png'
const NAME = 'project name'
const URL = 'https://foo.com/bar'

const projectCard = (
  <ProjectCard
    description={DESCRIPTION}
    image={IMAGE}
    name={NAME}
    url={URL}
  />
)

describe('Component > ProjectCard', function () {
  before(function () {
    wrapper = render(projectCard)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should include a link to the project', function () {
    const linkWrapper = wrapper.find('a')
    expect(linkWrapper.prop('href')).to.equal(URL)
  })

  it('should include the project image', function () {
    const imageWrapper = shallow(projectCard)
    expect(imageWrapper.find({ src: IMAGE })).to.have.lengthOf(1)
  })

  it('should include the project name', function () {
    const text = wrapper.text()
    expect(text).to.include(NAME)
  })

  it('should include the project description', function () {
    const text = wrapper.text()
    expect(text).to.include(DESCRIPTION)
  })

  it('should include a link to the project', function () {
    const linkWrapper = wrapper.find('a')
    expect(linkWrapper.prop('href')).to.equal(URL)
  })
})
