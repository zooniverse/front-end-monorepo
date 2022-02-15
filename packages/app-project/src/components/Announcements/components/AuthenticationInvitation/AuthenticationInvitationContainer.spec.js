import { mount, shallow } from 'enzyme'
import { CloseButton } from '@zooniverse/react-components'
import AuthenticationInvitationContainer from './AuthenticationInvitationContainer'
import GenericAnnouncement from '../GenericAnnouncement'
import NavLink from '@shared/components/NavLink'

describe('Component > AuthenticationInvitationContainer', function () {
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

  it('should have a link to the login form', function () {
    const signInLink = wrapper.find(NavLink).first()
    expect(signInLink.props().link.href).to.equal(`${window.location.pathname}?login=true`)
  })

  it('should have a link to the register form', function () {
    const registerLink = wrapper.find(NavLink).last()
    expect(registerLink.props().link.href).to.equal(`${window.location.pathname}?register=true`)
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
      wrapper = mount(<AuthenticationInvitationContainer isVisible />)
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
