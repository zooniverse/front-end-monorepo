import { GROUP_ADMIN_USER, USER } from '../../../../../test/mocks/panoptes/users.js'
import Dashboard from './Dashboard.js'

export default {
  title: 'Components / UserHome / Dashboard',
  component: Dashboard
}

export const Default = {
  args: {
    authUser: USER,
    profileBannerSrc: 'https://panoptes-uploads.zooniverse.org/user_profile_header/9da9fd16-46c1-4d84-a272-83ac19fb32c3.jpeg'
  }
}

export const NoAvatarOrBanner = {
  args: {
    authUser: GROUP_ADMIN_USER,
    profileBannerSrc: ''
  }
}
