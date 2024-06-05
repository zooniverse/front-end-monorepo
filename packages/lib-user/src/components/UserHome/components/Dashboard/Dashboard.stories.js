import { Box } from 'grommet'
import {
  GROUP_ADMIN_USER,
  USER
} from '../../../../../test/mocks/panoptes/users.js'
import Dashboard from './Dashboard.js'

export default {
  title: 'Components / UserHome / Dashboard',
  component: Dashboard,
  decorators: [ComponentDecorator]
}

function ComponentDecorator(Story) {
  return (
    <Box
      background={{
        dark: 'dark-3',
        light: 'neutral-6'
      }}
    >
      <Story />
    </Box>
  )
}

export const Default = {
  args: {
    authUser: USER,
    profileBannerSrc:
      'https://panoptes-uploads.zooniverse.org/user_profile_header/9da9fd16-46c1-4d84-a272-83ac19fb32c3.jpeg',
    statsPreview: {
      thisWeek: {
        classifications: 542,
        projects: 3
      },
      allTime: {
        classifications: 30673,
        projects: 123
      }
    }
  }
}

export const NoImagesOrStats = {
  args: {
    authUser: GROUP_ADMIN_USER,
    profileBannerSrc: '',
    statsPreview: {
      classifications: {
        thisWeek: 0,
        allTime: 0
      },
      projects: {
        thisWeek: 0,
        allTime: 0
      }
    }
  }
}
