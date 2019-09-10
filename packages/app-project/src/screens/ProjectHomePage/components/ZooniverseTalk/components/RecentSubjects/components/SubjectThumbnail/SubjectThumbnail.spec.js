import { shallow } from 'enzyme'
import React from 'react'
import { Anchor } from 'grommet'
import { Media } from '@zooniverse/react-components'

import SubjectThumbnail from './SubjectThumbnail'

describe('Component > SubjectThumbnail', function () {
  let wrapper
  const href = '/projects/test/project/talk'

  function mockSubject(id) {
    return {
      id,
      locations: [
        {'image/jpeg': `https://www.zooniverse.org/mock-subjects/file-${id}.jpg`}
      ]
    }
  }

  before(function () {
    wrapper = shallow(<SubjectThumbnail height={100} href={href} width={100} subject={mockSubject('1')} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render a linked thumbnail', function () {
      const link = wrapper.find(Anchor)
      const href = '/projects/test/project/talk/subjects/1'
      const src = 'https://www.zooniverse.org/mock-subjects/file-1.jpg'
      const media = link.find(Media)
      expect(link.prop('href')).to.equal(href)
      expect(media.prop('src')).to.equal(src)
  })
})
