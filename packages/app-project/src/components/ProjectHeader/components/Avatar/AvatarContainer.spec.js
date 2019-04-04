import { shallow } from 'enzyme'
import React from 'react'

import AvatarContainer from './AvatarContainer'
import Avatar from './Avatar'

let wrapper
const avatarSrc = 'https://example.com/image.jpg'
const projectTitle = 'Example project'
const isNarrow = true

describe('Component > AvatarContainer', function () {
  before(function () {
    wrapper = shallow(<AvatarContainer.wrappedComponent
      avatarSrc={avatarSrc}
      isNarrow={isNarrow}
      projectTitle={projectTitle}
    />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `Avatar` component', function () {
    expect(wrapper.find(Avatar)).to.have.lengthOf(1)
  })

  it('should pass the required props to the Avatar component', function () {
    const child = wrapper.find(Avatar)
    expect(child.prop('isNarrow')).to.equal(isNarrow)
    expect(child.prop('projectTitle')).to.equal(projectTitle)
    expect(child.prop('src')).to.equal(avatarSrc)
  })
})
