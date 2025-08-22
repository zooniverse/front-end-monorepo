import { Box, Grid } from 'grommet'
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime'
import Router from 'next/router'
import { node } from 'prop-types'
import TeamMember from './TeamMember'

function RouterMock({ children }) {
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
  children: node.isRequired
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
  component: TeamMember
}

export const Default = () => (
  <RouterMock>
    <Grid columns={['flex', 'small']}>
      <Box />
      <Box as='ul' pad={{ top: 'small', left: 'small' }}>
        <TeamMember user={defaultUser} />
      </Box>
    </Grid>
  </RouterMock>
)

export const Placeholder = () => {
  return (
    <RouterMock>
      <Grid columns={['flex', 'small']}>
        <Box />
        <Box as='ul' pad={{ top: 'small', left: 'small' }}>
          <TeamMember user={placeholderUser} />
        </Box>
      </Grid>
    </RouterMock>
  )
}

export const Owner = () => {
  return (
    <RouterMock>
      <Grid columns={['flex', 'small']}>
        <Box />
        <Box as='ul' pad={{ top: 'small', left: 'small' }}>
          <TeamMember user={ownerUser} />
        </Box>
      </Grid>
    </RouterMock>
  )
}
