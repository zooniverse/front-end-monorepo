import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import zooTheme from '@zooniverse/grommet-theme'

import { AuthenticationInvitationConnector } from './AuthenticationInvitationConnector'
import GenericAnnouncement from '../GenericAnnouncement'
import en from './locales/en'
import { expect } from 'chai'

describe('Component > AuthenticationInvitationConnector', function () {
  let wrapper
  let componentWrapper
  let useContextMock

  const mockStore = {
    store: {
      project: {
        baseUrl: 'zookeeper/galaxy-zoo',
        isComplete: false
      },
      ui: {
        dismissProjectAnnouncementBanner: sinon.spy(),
        showAnnouncement: true
      },
      user: {
        isLoggedIn: false
      },
      yourStats: {
        sessionCount: 5
      }
    }
  }

  before(function () {
    useContextMock = sinon.stub(React, 'useContext').callsFake(() => mockStore)
    wrapper = shallow(
      <AuthenticationInvitationConnector theme={zooTheme} />
    )
    componentWrapper = wrapper.find(GenericAnnouncement)
  })

  after(function () {
    useContextMock.restore()
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `GenericAnnouncement` component if visible', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })

  it('should pass down the required props', function () {
    expect(componentWrapper.props().announcement).to.equal(en.AuthenticationInvitation.announcement)
  })

  describe('when the project is finished', function () {
    before(function () {
      mockStore.store.project.isComplete = true
      wrapper = shallow(
        <AuthenticationInvitationConnector theme={zooTheme} />
      )
      componentWrapper = wrapper.find(GenericAnnouncement)
    })

    after(function () {
      mockStore.store.project.isComplete = false
    })

    it('should not render the `GenericAnnouncement` component', function () {
      expect(componentWrapper).to.have.lengthOf(0)
    })
  })

  describe('when the user is logged in', function () {
    before(function () {
      mockStore.store.user.isLoggedIn = true
      wrapper = shallow(
        <AuthenticationInvitationConnector theme={zooTheme} />
      )
      componentWrapper = wrapper.find(GenericAnnouncement)
    })

    after(function () {
      mockStore.store.user.isLoggedIn = false
    })

    it('should not render the `GenericAnnouncement` component', function () {
      expect(componentWrapper).to.have.lengthOf(0)
    })
  })

  describe('when the banner has been dismissed for the session', function () {
    before(function () {
      mockStore.store.ui.showAnnouncement = false
      wrapper = shallow(
        <AuthenticationInvitationConnector theme={zooTheme} />
      )
      componentWrapper = wrapper.find(GenericAnnouncement)
    })

    after(function () {
      mockStore.store.ui.showAnnouncement = true
    })

    it('should not render the `GenericAnnouncement` component', function () {
      expect(componentWrapper).to.have.lengthOf(0)
    })
  })

  describe('when the session classification count is less than five', function () {
    before(function () {
      mockStore.store.yourStats.sessionCount = 3
      wrapper = shallow(
        <AuthenticationInvitationConnector theme={zooTheme} />
      )
      componentWrapper = wrapper.find(GenericAnnouncement)
    })

    it('should not render the `GenericAnnouncement` component', function () {
      expect(componentWrapper).to.have.lengthOf(0)
    })
  })
})
