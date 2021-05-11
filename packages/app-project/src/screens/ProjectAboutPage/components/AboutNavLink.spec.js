import { mount } from 'enzyme'
import AboutNavLink from './AboutNavLink'
import NavLink from '@shared/components/NavLink'
import { Box } from 'grommet'

describe.only('Component > AboutNavLink', function () {
  let wrapper

  describe('not active page', function () {
    const router = {
      asPath: 'active-path'
    }

    const link = {
      href: 'not-active-path'
    }

    before(function () {
      wrapper = mount(<AboutNavLink router={router} link={link} />)
    })

    it('should render without crashing', function () {
      expect(wrapper).to.be.ok()
    })  

    it('should display non-active background color', function () {
      const container = wrapper.find(Box)
      expect(container.props().background).to.equal('neutral-6')
    })

    it('should display non-active font color', function () {
      const navLink = wrapper.find(NavLink)
      expect(navLink.props().color).to.equal('dark-5')
    })

    it('should display regular font weight', function () {
      const navLink = wrapper.find(NavLink)
      expect(navLink.props().weight).to.equal('normal')
    })
  })

  describe('active page', function () {
    const router = {
      asPath: 'active-path'
    }

    const link = {
      href: 'active-path'
    }

    before(function () {
      wrapper = mount(<AboutNavLink router={router} link={link} />)
    })

    it('should display active background color', function () {
      const container = wrapper.find(Box)
      expect(container.props().background).to.equal('accent-2')
    })

    it('should display active font color', function () {
      const navLink = wrapper.find(NavLink)
      expect(navLink.props().color).to.equal('neutral-2')
    })

    it('should display bold font weight', function () {
      const navLink = wrapper.find(NavLink)
      expect(navLink.props().weight).to.equal('bold')
    })
  })
})
