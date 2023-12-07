import ProfileHeader from './ProfileHeader.js'

export default {
  title: 'Components/UserStats/ProfileHeader',
  component: ProfileHeader
}

export const Default = () => (
  
  <ProfileHeader
    avatar='https://panoptes-uploads-staging.zooniverse.org/user_avatar/e638f5a3-7ffb-4d23-bb08-f296377a2e74.jpeg'
    classifications={384}
    displayName='Test User'
    login='TestUser'
    projects={22}
  />
)

export const UserWithHours = () => (
  <ProfileHeader
    avatar='https://panoptes-uploads-staging.zooniverse.org/user_avatar/e638f5a3-7ffb-4d23-bb08-f296377a2e74.jpeg'
    displayName='Test User'
    hours={5}
    login='TestUser'
    projects={22}
  />
)

export const Group = () => (
  <ProfileHeader
    classifications={1526}
    contributors={386}
    displayName='Test Group'
    projects={31}
  />
)

export const GroupWithHours = () => (
  <ProfileHeader
    contributors={386}
    displayName='Test Group'
    hours={12}
    projects={31}
  />
)
