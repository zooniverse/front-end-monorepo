import { shallow } from 'enzyme'
import { Anchor } from 'grommet'
import { FavouritesButton, Media } from '@zooniverse/react-components'
import * as Router from 'next/router'
import sinon from 'sinon'

import SubjectPreview from './SubjectPreview'
import { CollectionsButton, TalkLink } from './components'

describe('Component > SubjectPreview', function () {
  let routerStub
  let wrapper

  const ROUTER = {
    locale: 'test',
    query: {
      owner: 'Foo',
      project: 'Bar'
    }
  }

  const subject = {
    favorite: false,
    id: '12345',
    locations: [
      { 'image/jpeg': 'https://somedomain/photo.jpg' }
    ],
    toggleFavourite: () => false
  }
  const slug = 'owner/projectName'

  before(function () {
    routerStub = sinon.stub(Router, 'useRouter').callsFake(() => ROUTER)
    wrapper = shallow(
      <SubjectPreview
        isLoggedIn
        subject={subject}
        slug={slug}
      />
    )
  })

  after(function () {
    routerStub.restore()
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
      expect(link.prop('href')).to.equal(`/projects/${slug}/talk/subjects/${subject.id}`)
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
    let favouritesButton

    beforeEach(function () {
      favouritesButton = wrapper.find(FavouritesButton)
    })

    it('should exist', function () {
      expect(favouritesButton.length).to.equal(1)
    })

    it('should be enabled', function () {
      expect(favouritesButton.prop('disabled')).to.be.false()
    })

    it('should not be checked', function () {
      expect(favouritesButton.prop('checked')).to.be.false()
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
          subject={subject}
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
