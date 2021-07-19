import { shallow } from 'enzyme'
import * as React from 'react'
import sinon from 'sinon'

import { ProjectAnnouncementConnector } from './ProjectAnnouncementConnector'
import GenericAnnouncement from '../GenericAnnouncement'



describe('Component > ProjectAnnouncementConnector', function () {
  let wrapper
  let componentWrapper
  let useContextMock
  const announcement = 'Arcu scelerisque curae eu sapien euismod nisl, viverra gravida donec interdum tempor vulputate nec, nam morbi rhoncus porta sollicitudin.'

  const mockStore = {
    store: {
      project: {
        configuration: {
          announcement
        }
      },
      ui: {
        dismissProjectAnnouncementBanner: sinon.spy(),
        showAnnouncement: false
      }
    }
  }

  before(function () {
    useContextMock = sinon.stub(React, 'useContext').callsFake(() => mockStore)
    wrapper = shallow(<ProjectAnnouncementConnector />)
    componentWrapper = wrapper.find(GenericAnnouncement)
  })

  after(function () {
    useContextMock.restore()
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `GenericAnnouncement` component if visible', function () {
    expect(wrapper.html()).to.be.null()
    expect(componentWrapper).to.have.lengthOf(0)
    mockStore.store.ui.showAnnouncement = true
    wrapper = shallow(<ProjectAnnouncementConnector />)
    componentWrapper = wrapper.find(GenericAnnouncement)
    expect(componentWrapper).to.have.lengthOf(1)
  })

  it('should pass down the required props', function () {
    expect(componentWrapper.props().announcement).to.equal(announcement)
  })
})
