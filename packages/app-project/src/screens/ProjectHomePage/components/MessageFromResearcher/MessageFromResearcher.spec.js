import { shallow, render } from 'enzyme'
import React from 'react'

import MessageFromResearcher from './MessageFromResearcher'
import translations from './locales/en'

const AVATAR = 'avatar.jpg'
const MESSAGE = 'this is a researcher message'
const RESEARCHER = 'researcher name'

describe('Component > MessageFromResearcher', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<MessageFromResearcher />)
    expect(wrapper).to.be.ok()
  })

  describe('behaviour without a researcher message', function () {
    it('should show a message', function () {
      const wrapper = render(<MessageFromResearcher />)
      expect(wrapper.text()).to.include(translations.MessageFromResearcher.noMessage)
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
