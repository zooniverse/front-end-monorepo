import { Box, Grommet, Grid } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import Router from 'next/router'
import PropTypes from 'prop-types'
import TeamMember from './TeamMember'

function RouterMock ({ children }) {
  const mockRouter = {
    asPath: '/projects/zooniverse/snapshot-serengeti/about/research',
    push: () => {},
    prefetch: () => new Promise((resolve, reject) => {}),
    query: {
      owner: 'zooniverse',
      project: 'snapshot-serengeti'
    }
  }

  Router.router = mockRouter

  return (
    <RouterContext.Provider value={mockRouter}>
      {children}
    </RouterContext.Provider>
  )
}

RouterMock.propTypes = {
  children: PropTypes.node.isRequired
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
  <RouterMock>
    <Grid columns={['flex', 'small']}>
      <Box />
      <Grommet
        background={{ dark: 'dark-3', light: 'neutral-6' }}
        theme={{ ...zooTheme, dark }}
        themeMode={dark ? 'dark' : 'light'}
      >
        <Box as='ul' pad={{ top: 'small', left: 'small' }}>
          <TeamMember user={defaultUser} />
        </Box>
      </Grommet>
    </Grid>
  </RouterMock>
)

export const Placeholder = ({ dark }) => {
  return (
    <RouterMock>
      <Grid columns={['flex', 'small']}>
        <Box />
        <Grommet
          background={{ dark: 'dark-3', light: 'neutral-6' }}
          theme={{ ...zooTheme, dark }}
          themeMode={dark ? 'dark' : 'light'}
        >
          <Box as='ul' pad={{ top: 'small', left: 'small' }}>
            <TeamMember user={placeholderUser} />
          </Box>
        </Grommet>
      </Grid>
    </RouterMock>
  )
}

export const Owner = ({ dark }) => {
  return (
    <RouterMock>
      <Grid columns={['flex', 'small']}>
        <Box />
        <Grommet
          background={{ dark: 'dark-3', light: 'neutral-6' }}
          theme={{ ...zooTheme, dark }}
          themeMode={dark ? 'dark' : 'light'}
        >
          <Box as='ul' pad={{ top: 'small', left: 'small' }}>
            <TeamMember user={ownerUser} />
          </Box>
        </Grommet>
      </Grid>
    </RouterMock>
  )
}
