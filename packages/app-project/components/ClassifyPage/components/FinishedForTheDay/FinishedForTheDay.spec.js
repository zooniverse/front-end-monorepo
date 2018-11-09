import { shallow, render } from 'enzyme'
import React from 'react'

import FinishedForTheDay from './FinishedForTheDay'
import ProjectImage from './components/ProjectImage'

const projectName = 'Foobar'
const imageSrc = 'foobar.jpg'

let wrapper

describe('Component > FinishedForTheDay', function () {
  before(function () {
    wrapper = render(<FinishedForTheDay projectName={projectName} />)
  })

  it('should render without crashing', function () {})

  it('should contain a title', function () {
    expect(wrapper.find('h3').first().length).to.equal(1)
  })

  it('should contain some text', function () {
    const para = wrapper.find('p').first()
    expect(para.length).to.equal(1)
    expect(para.text().length).to.be.ok
  })

  xit('should contain a stats button', function () {
    // We'll test this by link, and that link isn't hooked up yet
  })

  xit('should contain an other projects button', function () {
    // We'll test this by link, and that link isn't hooked up yet
  })

  it('should not contain a `ProjectImage` if there\'s no `imgSrc` prop', function () {
    const image = wrapper.find(ProjectImage)
    expect(image.length).to.equal(0)
  })

  it('should contain a `ProjectImage` if an `imageSrc` prop is present', function () {
    const wrapper = shallow(<FinishedForTheDay projectName={projectName} imageSrc={imageSrc} />)
    const projectImageWrapper = wrapper.find(ProjectImage)
    expect(projectImageWrapper.length).to.equal(1)
    expect(projectImageWrapper.prop('imageSrc')).to.equal(imageSrc)
  })
})
