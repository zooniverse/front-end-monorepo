import NavLink from './NavLink'
import { NavLinkCurrentPageMock, NavLinkOtherPageMock, NavLinkMock } from './NavLink.mock'

export default {
  title: 'Project App / Shared / NavLink',
  component: NavLink
}

export const OnCurrentPage = () => (
  <NavLink router={NavLinkCurrentPageMock} link={NavLinkMock} />
)

export const NotOnCurrentPage = () => (
  <NavLink router={NavLinkOtherPageMock} link={NavLinkMock} />
)

export const Disabled = () => (
  <NavLink disabled router={NavLinkOtherPageMock} link={NavLinkMock} />
)
