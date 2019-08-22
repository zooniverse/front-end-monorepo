import { shallow } from 'enzyme'
import React from 'react'
import { Media } from '@zooniverse/react-components'
import { Anchor } from 'grommet'

import RecentSubjects from './RecentSubjects'

describe('Component > RecentSubjects', function () {
  let wrapper
  const subjects = [
    mockSubject('2'),
    mockSubject('1'),
    mockSubject('3')
  ]
  function mockSubject(id) {
    return {
      id,
      locations: [
        {'image/jpeg': `https://www.zooniverse.org/mock-subjects/file-${id}.jpg`}
      ]
    }
  }

  before(function () {
    wrapper = shallow(
      <RecentSubjects
        href="/projects/test/project/talk"
        subjects={subjects}
      />
    )
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render a linked thumbnail for each subject', function () {
    const links = wrapper.find(Anchor)
    expect(links.length).to.equal(3)
    links.forEach(function (link, i) {
      const subject = subjects[i]
      const href = `/projects/test/project/talk/subjects/${subject.id}`
      const src = `https://www.zooniverse.org/mock-subjects/file-${subject.id}.jpg`
      const media = link.find(Media)
      expect(link.prop('href')).to.equal(href)
      expect(media.prop('src')).to.equal(src)
    })
  })
})
