import { Box, Grommet, Grid } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'
import TeamMember from './TeamMember'

const mockedRouter = {
  asPath: '/projects/zooniverse/snapshot-serengeti/about/team',
  query: {
    owner: 'zooniverse',
    project: 'snapshot-serengeti'
  }
}

const defaultUser = {
  avatar_src:
    'https://panoptes-uploads.zooniverse.org/user_avatar/6eca0bce-bf42-4cac-9064-c1216c0ba42b.jpeg',
  display_name: 'Mock User',
  id: '12345',
  login: 'mock_user',
  roles: ['collaborator', 'scientist']
}

const placeholderUser = {
  avatar_src: '',
  display_name: 'Mock User',
  id: '12345',
  login: 'mock_user',
  roles: ['collaborator']
}

const ownerUser = {
  avatar_src:
    'https://panoptes-uploads.zooniverse.org/user_avatar/6eca0bce-bf42-4cac-9064-c1216c0ba42b.jpeg',
  display_name: 'Mock User',
  id: '12345',
  login: 'mock_user',
  roles: ['owner']
}

export default {
  title: 'Project App / Screens / About Pages / TeamMember',
  component: TeamMember,
  args: {
    dark: false
  }
}

export const Default = ({ dark }) => (
  <Grid columns={['flex', 'small']}>
    <Box />
    <Grommet
      background={{ dark: 'dark-3', light: 'neutral-6' }}
      theme={{ ...zooTheme, dark }}
      themeMode={dark ? 'dark' : 'light'}
    >
      <Box as='ul' pad={{ top: 'small', left: 'small' }}>
        <TeamMember router={mockedRouter} user={defaultUser} />
      </Box>
    </Grommet>
  </Grid>
)

export const Placeholder = ({ dark }) => {
  return (
    <Grid columns={['flex', 'small']}>
      <Box />
      <Grommet
        background={{ dark: 'dark-3', light: 'neutral-6' }}
        theme={{ ...zooTheme, dark }}
        themeMode={dark ? 'dark' : 'light'}
      >
        <Box as='ul' pad={{ top: 'small', left: 'small' }}>
          <TeamMember router={mockedRouter} user={placeholderUser} />
        </Box>
      </Grommet>
    </Grid>
  )
}

export const Owner = ({ dark }) => {
  return (
    <Grid columns={['flex', 'small']}>
      <Box />
      <Grommet
        background={{ dark: 'dark-3', light: 'neutral-6' }}
        theme={{ ...zooTheme, dark }}
        themeMode={dark ? 'dark' : 'light'}
      >
        <Box as='ul' pad={{ top: 'small', left: 'small' }}>
          <TeamMember router={mockedRouter} user={ownerUser} />
        </Box>
      </Grommet>
    </Grid>
  )
}
