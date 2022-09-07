import { shallow } from 'enzyme'
import zooTheme from '@zooniverse/grommet-theme'

import { FinishedAnnouncementConnector } from './FinishedAnnouncementConnector'
import GenericAnnouncement from '../GenericAnnouncement'

describe('Component > FinishedAnnouncementConnector', function () {
  let wrapper
  let componentWrapper

  const mockStore = {
    store: {
      project: {
        baseUrl: 'zookeeper/galaxy-zoo',
        isComplete: false
      }
    }
  }

  before(function () {
    wrapper = shallow(
      <FinishedAnnouncementConnector mockStore={mockStore.store} theme={zooTheme} />
    )
    componentWrapper = wrapper.find(GenericAnnouncement)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `GenericAnnouncement` component if visible', function () {
    expect(componentWrapper).to.have.lengthOf(0)
    mockStore.store.project.isComplete = true
    wrapper = shallow(
      <FinishedAnnouncementConnector mockStore={mockStore.store} theme={zooTheme} />
    )
    componentWrapper = wrapper.find(GenericAnnouncement)
    expect(componentWrapper).to.have.lengthOf(1)
  })
})
