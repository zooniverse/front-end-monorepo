import { shallow } from 'enzyme'
import * as React from 'react'
import sinon from 'sinon'
import zooTheme from '@zooniverse/grommet-theme'

import { FinishedAnnouncementConnector } from './FinishedAnnouncementConnector'
import GenericAnnouncement from '../GenericAnnouncement'
import en from './locales/en'

describe('Component > FinishedAnnouncementConnector', function () {
  let wrapper
  let componentWrapper
  let useContextMock

  const mockStore = {
    store: {
      project: {
        baseUrl: 'zookeeper/galaxy-zoo',
        isComplete: false
      }
    }
  }

  before(function () {
    useContextMock = sinon.stub(React, 'useContext').callsFake(() => mockStore)
    wrapper = shallow(
      <FinishedAnnouncementConnector theme={zooTheme} />
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
    expect(componentWrapper).to.have.lengthOf(0)
    mockStore.store.project.isComplete = true
    wrapper = shallow(
      <FinishedAnnouncementConnector theme={zooTheme} />
    )
    componentWrapper = wrapper.find(GenericAnnouncement)
    expect(componentWrapper).to.have.lengthOf(1)
  })

  it('should pass down the required props', function () {
    expect(componentWrapper.props().announcement).to.equal(en.FinishedAnnouncement.announcement)
  })
})
