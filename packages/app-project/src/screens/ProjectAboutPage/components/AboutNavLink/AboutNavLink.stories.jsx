import { Grid } from 'grommet'
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime'

import AboutNavLink from './AboutNavLink'

const defaultLink = {
  href: '/projects/zooniverse/snapshot-serengeti/about/research',
  text: 'research'
}

const mockedRouter = {
  asPath: '/projects/zooniverse/snapshot-serengeti/about/team',
  query: {
    owner: 'zooniverse',
    project: 'snapshot-serengeti'
  }
}

function NextRouterStory(Story) {
  return (
    <RouterContext.Provider value={mockedRouter}>
      <Story />
    </RouterContext.Provider>
  )
}

export default {
  title: 'Project App / Screens / About Pages / AboutNavLink',
  component: AboutNavLink,
  decorators: [NextRouterStory],
  args: {
    dark: false,
    router: mockedRouter
  }
}

export const Default = () => (
  <Grid columns={['small', 'flex']}>
    <AboutNavLink router={mockedRouter} link={defaultLink} />
  </Grid>
)

Default.args = {
  link: defaultLink
}
