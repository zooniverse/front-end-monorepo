import { Grommet, Grid } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'
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

export const Default = ({ dark }) => (
  <Grid columns={['small', 'flex']}>
    <Grommet
      background={{ dark: 'dark-3', light: 'neutral-6' }}
      theme={{ ...zooTheme, dark }}
      themeMode={dark ? 'dark' : 'light'}
    >
      <AboutNavLink router={mockedRouter} link={defaultLink} />
    </Grommet>
  </Grid>
)

export const Current = ({ dark }) => (
  <Grid columns={['small', 'flex']}>
    <Grommet
      background={{ dark: 'dark-3', light: 'neutral-6' }}
      theme={{ ...zooTheme, dark }}
      themeMode={dark ? 'dark' : 'light'}
    >
      <AboutNavLink router={mockedRouter} link={currentLink} />
    </Grommet>
  </Grid>
)

Default.args = {
  link: defaultLink
}

Current.args = {
  link: currentLink
}
