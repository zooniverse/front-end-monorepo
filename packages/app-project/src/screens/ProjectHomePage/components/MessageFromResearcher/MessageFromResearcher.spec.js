import { shallow, render } from 'enzyme'
import sinon from 'sinon'
import i18n from '@test/i18n-for-tests'

import MessageFromResearcher from './MessageFromResearcher'

const AVATAR = 'avatar.jpg'
const MESSAGE = 'this is a researcher message'
const RESEARCHER = 'researcher name'
const TALK_LINK = '/projects/owner/slug/talk'

describe('Component > MessageFromResearcher', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<MessageFromResearcher />)
    expect(wrapper).to.be.ok()
  })

  describe('behaviour without a researcher message', function () {
    let useTranslationStub
    let wrapper

    before(function () {
      useTranslationStub = sinon.stub(i18n, 't')
      wrapper = render(<MessageFromResearcher talkLink={TALK_LINK} />)
    })

    after(function () {
      useTranslationStub.restore()
    })

    it('should show a message', function () {
      expect(useTranslationStub).to.have.been.calledWith('Home.MessageFromResearcher.noMessage')
    })

    it('should show a link to the talk board', function () {
      const link = wrapper.find('a')
      expect(link.attr('href')).to.equal(TALK_LINK)
    })
  })

  describe('behaviour with a researcher message', function () {
    let wrapper

    before(function () {
      wrapper = render(<MessageFromResearcher
        avatar={AVATAR}
        message={MESSAGE}
        researcher={RESEARCHER}
      />)
    })

    it('should show the avatar', function () {
      const avatarWrapper = wrapper.find('img')
      expect(avatarWrapper.prop('src')).to.equal(AVATAR)
    })

    it('should show the message', function () {
      expect(wrapper.text()).to.include(MESSAGE)
    })

    it('should show the researcher name', function () {
      expect(wrapper.text()).to.include(RESEARCHER)
    })
  })
})
