import { shallow } from 'enzyme'
import React from 'react'
import { Anchor } from 'grommet'
import { Media } from '@zooniverse/react-components'

import SubjectPreview from './SubjectPreview'
import { CollectionsButton, FavouritesButton, TalkLink } from './components'

describe('Component > SubjectPreview', function () {
  let wrapper
  const recent = {
    favorite: false,
    subjectId: '12345',
    locations: [
      { 'image/jpeg': 'https://somedomain/photo.jpg' }
    ]
  }
  const slug = 'owner/projectName'

  before(function () {
    wrapper = shallow(
      <SubjectPreview
        recent={recent}
        slug={slug}
      />
    )
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  describe('the preview media', function () {
    let link
    let media

    before(function () {
      link = wrapper.find(Anchor)
      media = link.find(Media)
    })

    it('should link to the subject Talk page', function () {
      expect(link.prop('href')).to.equal(`/projects/${slug}/talk/subjects/${recent.subjectId}`)
    })

    it('should display the first subject location', function () {
      expect(media.prop('src')).to.equal('https://somedomain/photo.jpg')
    })

    it('should have alt text', function () {
      expect(media.prop('alt')).to.equal('subject 12345')
    })

    it('should have a talk link', function () {
      expect(wrapper.find(TalkLink).length).to.equal(1)
    })

    it('should have a favourites button', function () {
      expect(wrapper.find(FavouritesButton).length).to.equal(1)
    })

    it('should have a collections button', function () {
      expect(wrapper.find(CollectionsButton).length).to.equal(1)
    })
  })
})
