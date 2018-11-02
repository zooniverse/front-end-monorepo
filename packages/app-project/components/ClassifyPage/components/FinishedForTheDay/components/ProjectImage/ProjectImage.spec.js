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
    const placeholderWrapper = wrapper.find('Placeholder')
    expect(placeholderWrapper.length).to.equal(1)
  })

  it('should have a `<noscript />` image for SSR', function () {
    const noscriptWrapper = wrapper.find('noscript')
    const imageWrapper = noscriptWrapper.find('img')
    expect(noscriptWrapper.length).to.equal(1)
    expect(imageWrapper.length).to.equal(1)
  })
})
