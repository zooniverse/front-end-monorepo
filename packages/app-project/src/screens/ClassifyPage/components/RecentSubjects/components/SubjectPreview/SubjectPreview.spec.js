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
        isLoggedIn
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
  })

  it('should have a talk link', function () {
    expect(wrapper.find(TalkLink).length).to.equal(1)
  })

  describe('the favourites button', function () {
    it('should exist', function () {
      expect(wrapper.find(FavouritesButton).length).to.equal(1)
    })

    it('should be enabled', function () {
      expect(wrapper.find(FavouritesButton).prop('disabled')).to.be.false()
    })
  })

  describe('the collections button', function () {
    it('should exist', function () {
      expect(wrapper.find(CollectionsButton).length).to.equal(1)
    })

    it('should be enabled', function () {
      expect(wrapper.find(CollectionsButton).prop('disabled')).to.be.false()
    })
  })

  describe('without a logged-in user', function () {
    before(function () {
      wrapper = shallow(
        <SubjectPreview
          recent={recent}
          slug={slug}
        />
      )
    })

    it('should disable favourites', function () {
      expect(wrapper.find(FavouritesButton).prop('disabled')).to.be.true()
    })

    it('should disable collections', function () {
      expect(wrapper.find(CollectionsButton).prop('disabled')).to.be.true()
    })
  })
})
