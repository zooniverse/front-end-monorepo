import { Grommet, Grid } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'
import AboutSidebar from './AboutSidebar'

const mockedRouter = {
  asPath: '/projects/zooniverse/snapshot-serengeti/about/team',
  query: {
    owner: 'zooniverse',
    project: 'snapshot-serengeti'
  }
}
const mockAboutNavLinks = ['research', 'team', 'education', 'faq']

export default {
  title: 'Project App / Screens / About Pages / AboutSidebar',
  component: AboutSidebar,
  args: {
    dark: false
  }
}

export const Default = ({ dark }) => (
  <Grid columns={['small', 'flex']}>
    <Grommet
      background={{ dark: 'dark-3', light: 'neutral-6' }}
      theme={{ ...zooTheme, dark }}
      themeMode={dark ? 'dark' : 'light'}
    >
      <AboutSidebar aboutNavLinks={mockAboutNavLinks} router={mockedRouter} />
    </Grommet>
  </Grid>
)
