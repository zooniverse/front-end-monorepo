import Dashboard from './Dashboard.js'

export default {
  title: 'Components / UserHome / Dashboard',
  component: Dashboard
}

const USER = {
  admin: false,
  avatar_src: 'https://panoptes-uploads-staging.zooniverse.org/user_avatar/e638f5a3-7ffb-4d23-bb08-f296377a2e74.jpeg',
  display_name: 'Test User 1',
  id: '12345',
  login: 'TestUser',
  profile_header: 'https://panoptes-uploads.zooniverse.org/user_profile_header/9da9fd16-46c1-4d84-a272-83ac19fb32c3.jpeg'
}

const USER_NO_IMAGES = {
  admin: false,
  avatar_src: '',
  display_name: 'Zootester 123',
  id: '847637',
  login: 'zootester123',
  profile_header: ''
}

export const Default = {
  args: {
    user: USER
  }
}

export const NoAvatarOrBanner = {
  args: {
    user: USER_NO_IMAGES
  }
}
