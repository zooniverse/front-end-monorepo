import { mount, shallow } from 'enzyme'
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime'
import { CloseButton, PlainButton } from '@zooniverse/react-components'
import AuthenticationInvitationContainer from './AuthenticationInvitationContainer'
import GenericAnnouncement from '../GenericAnnouncement'

describe('Component > AuthenticationInvitationContainer', function () {
  const mockRouter = {
    asPath: '/projects/zooniverse/snapshot-serengeti/about/team',
    query: {
      owner: 'zooniverse',
      project: 'snapshot-serengeti'
    }
  }

  let wrapper, componentWrapper

  before(function () {
    wrapper = shallow(<AuthenticationInvitationContainer isVisible />)
    componentWrapper = wrapper.find(GenericAnnouncement)
  })

  it('should render without crashing', function() {
    expect(wrapper).to.be.ok()
  })

  it('should render the `GenericAnnouncement` component if visible', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })

  describe('when not visible', function () {
    before(function () {
      wrapper = shallow(<AuthenticationInvitationContainer />)
      componentWrapper = wrapper.find(GenericAnnouncement)
    })

    it('should not render an announcement banner', function () {
      expect(componentWrapper).to.have.lengthOf(0)
    })
  })

  describe('when dismissed', function () {
    before(function () {
      wrapper = mount(
        <RouterContext.Provider value={mockRouter}>
          <AuthenticationInvitationContainer isVisible />
        </RouterContext.Provider>
      )
      componentWrapper = wrapper.find(GenericAnnouncement)
    })

    it('should not render an announcement banner', function () {
      expect(componentWrapper).to.have.lengthOf(1)
      wrapper.find(CloseButton).last().simulate('click')
      componentWrapper = wrapper.find(GenericAnnouncement)
      expect(componentWrapper).to.have.lengthOf(0)
    })
  })
})
