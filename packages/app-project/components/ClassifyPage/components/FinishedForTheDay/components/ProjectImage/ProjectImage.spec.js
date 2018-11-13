import { mount } from 'enzyme'
import React from 'react'

import ProjectImage from './ProjectImage'

let wrapper

const projectName = 'Foobar'
const imageSrc = 'foobar.jpg'

describe('Component > ProjectImage', function () {
  before(function () {
    wrapper = mount(<ProjectImage imageSrc={imageSrc} projectName={projectName} />)
  })

  it('should render without crashing', function () {})

  it('should contain a `Placeholder` component', function () {
    expect(wrapper.find('Placeholder')).to.have.lengthOf(1)
  })

  it('should have a `<noscript />` image for SSR', function () {
    const noscriptWrapper = wrapper.find('noscript')
    expect(noscriptWrapper).to.have.lengthOf(1)
    expect(noscriptWrapper.find('img')).to.have.lengthOf(1)
  })

  it('should have an alt', function () {
    const imgsWrapper = wrapper.find('img')
    imgsWrapper.forEach(imgWrapper =>
      expect(imgWrapper.prop('alt')).to.equal(`Image for ${projectName}`)
    )
  })
})
