import { Box } from 'grommet'

import TalkComment from './TalkComment'

export default {
  title: 'Project App / Screens / Subject Talk / Talk Data / TalkComment',
  component: TalkComment,
  decorators: [(Story) => (
    <Box
      align='center'
      justify='center'
      background={{ dark: 'dark-3', light: 'white' }}
      fill
      pad='small'
    >
      <Box
        as='ol'
        fill
        width={{ max: '600px' }}
      >
        <Story />
      </Box>
    </Box>
  )]
}

export const Default = {
  args: {
    avatar: 'https://panoptes-uploads-staging.zooniverse.org/user_avatar/0c51ab10-8c23-47fc-9452-c11852c754a9.jpeg',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
    date: '2025-07-04T20:00:00Z',
    displayName: 'ZooTester 1',
    login: 'zootester1',
    upvotes: 0
  }
}

export const WithoutAvatar = {
  args: {
    body: 'This is a test comment without an avatar.',
    date: '2025-07-04T20:00:00Z',
    displayName: 'ZooTester 2',
    login: 'zootester2',
    upvotes: 2
  }
}
