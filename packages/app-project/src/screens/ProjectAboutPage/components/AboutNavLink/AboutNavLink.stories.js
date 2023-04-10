import { Grid } from 'grommet'
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

const currentLink = {
  href: '/projects/zooniverse/snapshot-serengeti/about/team',
  text: 'team'
}

export default {
  title: 'Project App / Screens / About Pages / AboutNavLink',
  component: AboutNavLink,
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

export const Current = () => (
  <Grid columns={['small', 'flex']}>
    <AboutNavLink router={mockedRouter} link={currentLink} />
  </Grid>
)

Default.args = {
  link: defaultLink
}

Current.args = {
  link: currentLink
}
