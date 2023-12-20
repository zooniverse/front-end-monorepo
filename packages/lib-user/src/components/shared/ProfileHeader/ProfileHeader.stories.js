import { Box, ResponsiveContext } from 'grommet'
import { useContext } from 'react'

import ProfileHeader from './ProfileHeader.js'

export default {
  title: 'Components/shared/ProfileHeader',
  component: ProfileHeader,
  decorators: [ComponentDecorator]
}

function ComponentDecorator (Story) {
  const size = useContext(ResponsiveContext)
  const horizontalPadding = size === 'small' ? '20px' : '100px'

  return (
    <Box
      background={{
        dark: 'dark-3',
        light: 'neutral-6'
      }}
      fill
      pad={{
        horizontal: horizontalPadding,
        vertical: '20px'
      }}
    >
      <Story />
    </Box>
  )
}

export const Default = {  
  args: {
    avatar: 'https://panoptes-uploads-staging.zooniverse.org/user_avatar/e638f5a3-7ffb-4d23-bb08-f296377a2e74.jpeg',
    classifications: 384,
    displayName: 'Test User',
    login: 'TestUser',
    projects: 22
  }
}

export const UserWithHours = {
  args: {
    avatar: 'https://panoptes-uploads-staging.zooniverse.org/user_avatar/e638f5a3-7ffb-4d23-bb08-f296377a2e74.jpeg',
    displayName: 'Test User',
    hours: 5,
    login: 'TestUser',
    projects: 22
  }
}

export const Group = {
  args: {
    classifications: 1526,
    contributors: 386,
    displayName: 'Test Group',
    projects: 31
  }
}

export const GroupWithHours = {
  args: {
    contributors: 386,
    displayName: 'Test Group',
    hours: 12,
    projects: 31
  }
}
