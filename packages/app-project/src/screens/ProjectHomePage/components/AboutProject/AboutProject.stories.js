import { Box, Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'
import AboutProject from './AboutProject'

const description = 'This is some descriptive text'
const projectName = 'Test Project'

export default {
  title: 'Project App / Screens / Project Home / About Project',
  component: AboutProject,
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
    <Box>
      <AboutProject description={description} projectName={projectName} />
    </Box>
  </Grommet>
)
