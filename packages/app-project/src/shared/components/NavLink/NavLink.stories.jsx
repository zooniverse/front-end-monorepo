import NavLink from './NavLink'
import { NavLinkCurrentPageMock, NavLinkOtherPageMock, NavLinkMock } from './NavLink.mock'
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime'

const mockRouter = {
  asPath: '/zooniverse/snapshot-serengeti/about/team',
  basePath: '/projects',
  locale: 'en',
  push() {},
  prefetch: () => new Promise((resolve, reject) => {}),
  query: {
    owner: 'zooniverse',
    project: 'snapshot-serengeti'
  }
}

function NextRouterStory(Story) {
  return (
    <RouterContext.Provider value={mockRouter}>
      <Story />
    </RouterContext.Provider>
  )
}

export default {
  title: 'Project App / Shared / NavLink',
  component: NavLink,
  decorators: [NextRouterStory]
}

export const OnCurrentPage = () => (
  <NavLink router={NavLinkCurrentPageMock} link={NavLinkMock} />
)

export const NotOnCurrentPage = () => (
  <NavLink router={NavLinkOtherPageMock} link={NavLinkMock} />
)
