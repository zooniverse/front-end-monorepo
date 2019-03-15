import { shallow } from 'enzyme'
import React from 'react'

import Avatar from './Avatar'

const src = 'https://example.com/image.jpg'
const projectTitle = 'Example project'

let wrapper

describe('Component > Avatar', function () {
  before(function () {
    wrapper = shallow(<Avatar projectTitle={projectTitle} src={src} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should have some `alt` text', function () {
    expect(wrapper.prop('alt')).to.equal(`Project avatar for ${projectTitle}`)
  })
})
