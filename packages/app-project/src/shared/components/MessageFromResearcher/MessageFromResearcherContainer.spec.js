import { shallow } from 'enzyme'
import React from 'react'

import MessageFromResearcher from './MessageFromResearcher'
import MessageFromResearcherContainer from './MessageFromResearcherContainer'

let wrapper
let MessageFromResearcherWrapper

const MESSAGE = 'This is a message from the '
const SOCIAL_USERNAME = 'the.zooniverse'
const SOCIAL_LINK = 'https://www.instagram.com/the.zooniverseTESTING/'
const AVATAR = 'https://www.fillmurray.com/g/375/27'

describe('Component > CompletionBarContainer', function () {
  before(function () {
    wrapper = shallow(
      <MessageFromResearcherContainer.wrappedComponent
        message={MESSAGE}
        socialUsername={SOCIAL_USERNAME}
        socialLink={SOCIAL_LINK}
        avatar={AVATAR}
      />
    )
    MessageFromResearcherWrapper = wrapper.find(MessageFromResearcher)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `MessageFromResearcher` component', function () {
    expect(MessageFromResearcherWrapper).to.have.lengthOf(1)
  })

  it('should pass through a `message` prop', function () {
    expect(MessageFromResearcherWrapper.prop('message')).to.equal(MESSAGE)
  })

  it('should pass through a `socialUsername` prop', function () {
    expect(MessageFromResearcherWrapper.prop('socialUsername')).to.equal(
      SOCIAL_USERNAME
    )
  })

  it('should pass through a `socialLink` prop', function () {
    expect(MessageFromResearcherWrapper.prop('socialLink')).to.equal(
      SOCIAL_LINK
    )
  })

  it('should pass through a `avatar` prop', function () {
    expect(MessageFromResearcherWrapper.prop('avatar')).to.equal(AVATAR)
  })
})
