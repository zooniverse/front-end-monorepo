import { Grommet, Box } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'
import AboutDropdownNav from '../AboutDropdownNav'

const mockedRouter = {
  asPath: '/projects/zooniverse/snapshot-serengeti/about/team',
  query: {
    owner: 'zooniverse',
    project: 'snapshot-serengeti'
  }
}

const mockAboutNavLinks = ['research', 'team', 'education', 'faq']

export default {
  title: 'Project App / Screens / About Pages / AboutDropdownNav',
  component: AboutDropdownNav,
  args: {
    dark: false
  }
}

export const Default = ({ dark }) => (
  <Grommet
    background={{ dark: 'dark-3', light: 'neutral-6' }}
    theme={{ ...zooTheme, dark }}
    themeMode={dark ? 'dark' : 'light'}
  >
    <Box pad='xsmall'>
      <AboutDropdownNav aboutNavLinks={mockAboutNavLinks} router={mockedRouter} />
    </Box>
  </Grommet>
)
