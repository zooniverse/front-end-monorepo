import { Box, Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'
import Avatar from './Avatar'

const AvatarStory = {
  title: 'Project App / Shared / Project Header / Avatar',
  component: Avatar,
  args: {
    approved: true,
    avatarSrc:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Main_zooniverse.jpg/300px-Main_zooniverse.jpg',
    dark: false,
    projectTitle: 'A Test Project'
  }
}

export default AvatarStory

export const WideScreen = ({ approved, avatarSrc, dark, projectTitle }) => (
  <Grommet
    background={{
      dark: 'dark-1',
      light: 'light-1'
    }}
    theme={zooTheme}
    themeMode={dark ? 'dark' : 'light'}
  >
    <Box align='center' pad='medium'>
      <Avatar
        approved={approved}
        avatarSrc={avatarSrc}
        isNarrow={false}
        projectTitle={projectTitle}
      />
    </Box>
  </Grommet>
)

export const NarrowScreen = ({ approved, avatarSrc, dark, projectTitle }) => (
  <Grommet
    background={{
      dark: 'dark-1',
      light: 'light-1'
    }}
    theme={zooTheme}
    themeMode={dark ? 'dark' : 'light'}
  >
    <Box align='center' pad='medium'>
      <Avatar
        approved={approved}
        avatarSrc={avatarSrc}
        isNarrow
        projectTitle={projectTitle}
      />
    </Box>
  </Grommet>
)
