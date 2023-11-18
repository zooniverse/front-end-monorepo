import { Box } from 'grommet'

import ProfileHeader from './ProfileHeader.js'

export default {
  title: 'Components/UserStats/ProfileHeader',
  component: ProfileHeader
}

function WrappedStory ({ children }) {
  return (
    <Box
      background={{ dark: 'dark-3', light: 'neutral-6' }}
      basis='full'
      fill
      pad={{ horizontal: 'xlarge', vertical: 'small' }}
    >
      {children}
    </Box>
  )
}

export const Default = () => (
  <WrappedStory>
    <ProfileHeader
      avatar='https://panoptes-uploads-staging.zooniverse.org/user_avatar/e638f5a3-7ffb-4d23-bb08-f296377a2e74.jpeg'
      classifications={384}
      displayName='Test User'
      login='TestUser'
      projects={22}
    />
  </WrappedStory>
)

export const UserWithHours = () => (
  <WrappedStory>
    <ProfileHeader
      avatar='https://panoptes-uploads-staging.zooniverse.org/user_avatar/e638f5a3-7ffb-4d23-bb08-f296377a2e74.jpeg'
      displayName='Test User'
      hours={5}
      login='TestUser'
      projects={22}
    />
  </WrappedStory>
)

export const Group = () => (
  <WrappedStory>
    <ProfileHeader
      classifications={1526}
      contributors={386}
      displayName='Test Group'
      projects={31}
    />
  </WrappedStory>
)

export const GroupWithHours = () => (
  <WrappedStory>
    <ProfileHeader
      contributors={386}
      displayName='Test Group'
      hours={12}
      projects={31}
    />
  </WrappedStory>
)

