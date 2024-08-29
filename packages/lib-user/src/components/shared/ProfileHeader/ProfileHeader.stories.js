import { Box, ResponsiveContext } from 'grommet'
import { useContext } from 'react'

import { USER, USER_GROUPS } from '../../../../test/mocks/panoptes'

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
    avatar: USER.avatar_src,
    classifications: 384,
    displayName: USER.display_name,
    login: USER.login,
    projects: 22
  }
}

export const UserWithHours = {
  args: {
    avatar: USER.avatar_src,
    displayName: USER.display_name,
    hours: 5.1,
    login: USER.login,
    projects: 22
  }
}

export const Group = {
  args: {
    classifications: 1526,
    contributors: 386,
    displayName: USER_GROUPS[0].display_name,
    projects: 31
  }
}

export const GroupWithHours = {
  args: {
    contributors: 386,
    displayName: USER_GROUPS[0].display_name,
    hours: 12.8,
    projects: 31
  }
}
