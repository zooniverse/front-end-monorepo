import { shallow } from 'enzyme'
import React from 'react'
import zooTheme from '@zooniverse/grommet-theme'

import { FinishedAnnouncementContainer } from './FinishedAnnouncementContainer'
import GenericAnnouncement from '../GenericAnnouncement'
import en from './locales/en'

describe('Component > FinishedAnnouncementContainer', function () {
  let wrapper
  let componentWrapper

  before(function () {
    wrapper = shallow(
      <FinishedAnnouncementContainer theme={zooTheme} />
    )
    componentWrapper = wrapper.find(GenericAnnouncement)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `GenericAnnouncement` component if visible', function () {
    expect(componentWrapper).to.have.lengthOf(0)
    wrapper.setProps({ isVisible: true })
    componentWrapper = wrapper.find(GenericAnnouncement)
    expect(componentWrapper).to.have.lengthOf(1)
  })

  it('should pass down the required props', function () {
    expect(componentWrapper.props().announcement).to.equal(en.FinishedAnnouncement.announcement)
  })
})
