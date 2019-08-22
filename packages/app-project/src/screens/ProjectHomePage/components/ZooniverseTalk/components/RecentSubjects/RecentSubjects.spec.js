import { shallow } from 'enzyme'
import React from 'react'
import { Media } from '@zooniverse/react-components'

import RecentSubjects from './RecentSubjects'

describe('Component > RecentSubjects', function () {
  let wrapper
  function mockSubject(id) {
    return {
      id,
      locations: [
        {'image/jpeg': `https://www.zooniverse.org/mock-subjects/file-${id}.jpg`}
      ]
    }
  }

  before(function () {
    const subjects = [
      mockSubject(2),
      mockSubject(1),
      mockSubject(3)
    ]
    wrapper = shallow(<RecentSubjects subjects={subjects} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render a thumbnail for each subject', function () {
    expect(wrapper.find(Media).length).to.equal(3)
  })
})
